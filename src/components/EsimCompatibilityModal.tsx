"use client";
import React, { useEffect, useRef } from 'react';
import './EsimCompatibilityModal.css';

type EsimCompatibilityModalProps = {
    open: boolean;
    onClose: () => void;
};

const EsimCompatibilityModal: React.FC<EsimCompatibilityModalProps> = ({ open, onClose }) => {
    const closeBtnRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (!open) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKey);

        // Foco inicial en el botón cerrar
        const t = setTimeout(() => closeBtnRef.current?.focus(), 0);

        return () => {
            document.removeEventListener('keydown', onKey);
            clearTimeout(t);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="sim-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="esim-modal-title">
            <div className="sim-modal-content" onClick={(e) => e.stopPropagation()}>
                <button
                    className="sim-modal-close"
                    aria-label="Cerrar"
                    onClick={onClose}
                    ref={closeBtnRef}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                </button>

                <div className="sim-modal-header">
                    <span className="sim-modal-icon">📲</span>
                    <h3 id="esim-modal-title" className="sim-modal-title">Compatibilidad eSIM</h3>
                </div>

                <div className="sim-modal-body">
                    <p className="sim-modal-description">
                        Verifica de forma rápida si tu dispositivo soporta eSIM. Aquí tienes un resumen de los modelos más comunes compatibles.
                    </p>

                    <div className="sim-modal-section">
                        <h4 className="sim-section-title">Modelos compatibles (resumen)</h4>
                        <ul className="sim-modal-list">
                            <li>
                                Apple iPhone: XR, XS, XS Max y posteriores (11, 12, 13, 14, 15, SE 2ª/3ª gen). Nota: iPhone 14/15 en EE. UU. son solo eSIM; algunos modelos chinos no incluyen eSIM.
                            </li>
                            <li>
                                iPad con eSIM: iPad Pro (3ª gen o superior), iPad Air (3ª gen o superior), iPad (7ª gen o superior), iPad mini (5ª gen o superior).
                            </li>
                            <li>
                                Google Pixel: 3 y posteriores (3/3a y algunas variantes de operadores pueden no soportar eSIM).
                            </li>
                            <li>
                                Samsung: series Galaxy S20 en adelante, Note 20, y plegables (Z Flip/Z Fold). Disponibilidad puede variar por región/operador.
                            </li>
                            <li>
                                Otros: algunos Motorola (Razr, Edge recientes) y marcas selectas con soporte eSIM según región.
                            </li>
                        </ul>
                    </div>

                    <div className="sim-modal-section">
                        <h4 className="sim-section-title">Cómo comprobar en tu equipo</h4>
                        <ol className="sim-modal-steps">
                            <li>
                                iPhone/iPad: Ajustes → Datos móviles/Red celular → “Agregar plan celular”. Si aparece, tu equipo soporta eSIM.
                            </li>
                            <li>
                                Android: Ajustes → Red e Internet → SIMs → “Agregar eSIM”. La ruta puede variar por fabricante.
                            </li>
                            <li>
                                También puedes buscar “eSIM” en Ajustes y revisar si permite añadir un plan eSIM.
                            </li>
                        </ol>
                    </div>

                    <div className="sim-modal-section">
                        <h4 className="sim-section-title">Notas importantes</h4>
                        <ul className="sim-modal-list">
                            <li>La compatibilidad puede variar por región/operador. Verifica la versión específica de tu modelo.</li>
                            <li>Requiere que el dispositivo esté desbloqueado para usar operadores internacionales.</li>
                        </ul>
                    </div>
                </div>

                <div className="sim-modal-footer">
                    <button className="btn-modal-close" onClick={onClose}>Cerrar</button>
                </div>
            </div>
            {/* Cerrar al hacer click fuera */}
            <button className="sim-modal-backdrop-click" aria-hidden onClick={onClose} />
        </div>
    );
};

export default EsimCompatibilityModal;
