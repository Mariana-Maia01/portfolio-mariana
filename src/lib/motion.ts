import type { Transition } from "framer-motion";

/**
 * Tokens de movimento (inspirados no "Designing Fluid Interfaces", WWDC 2018).
 *
 * Molas em vez de curvas com duração fixa: começam do valor atual na tela,
 * herdam a velocidade e podem ser interrompidas a qualquer momento.
 * `bounce: 0` = criticamente amortecida (damping 1.0), sem overshoot.
 * `duration` aqui é o "response" da Apple: quão rápido chega ao alvo.
 */
export const spring = {
  /** Padrão para entradas e reposicionamentos. */
  gentle: { type: "spring", bounce: 0, duration: 0.6 },
  /** Elementos de interface que respondem a um toque (menus, abas, botões). */
  snappy: { type: "spring", bounce: 0, duration: 0.35 },
  /** Só quando o gesto carrega momento (arrastar/soltar, inclinar com o ponteiro). */
  momentum: { type: "spring", bounce: 0.2, duration: 0.4 },
} satisfies Record<string, Transition>;

/** Parâmetros para useSpring (valores contínuos seguindo o ponteiro). */
export const followSpring = { stiffness: 220, damping: 30, mass: 0.6 };
