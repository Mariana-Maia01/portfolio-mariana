import { describe, expect, it, beforeAll } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import PdiSection from "@/components/pdi/PdiSection";
import Projects from "@/components/Projects";
import Index from "@/pages/Index";
import { pdiGoals } from "@/data/pdi";
import { resolveHash } from "@/hooks/use-hash-tab";

beforeAll(() => {
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  // @ts-expect-error - jsdom não implementa IntersectionObserver
  window.IntersectionObserver = IO;
  // @ts-expect-error - idem
  globalThis.IntersectionObserver = IO;
  window.scrollTo = () => {};
});

describe("Página", () => {
  it("aba Sobre mostra resumo, quem sou eu e experiência", () => {
    window.location.hash = "";
    const { container } = render(<Index />);
    ["hero", "quem-sou-eu", "experiencia"].forEach((id) =>
      expect(container.querySelector(`#${id}`)).not.toBeNull(),
    );
    expect(container.querySelector("#pdi")).toBeNull();
  });

  it("cada aba renderiza sua seção a partir do hash da URL", () => {
    for (const id of ["pdi", "projetos", "conhecimentos", "formacao"]) {
      window.location.hash = id;
      const { container, unmount } = render(<Index />);
      expect(container.querySelector(`#${id}`)).not.toBeNull();
      expect(container.querySelector("#quem-sou-eu")).toBeNull();
      unmount();
    }
    window.location.hash = "";
  });

  it("resolveHash mapeia âncoras para abas", () => {
    expect(resolveHash("#experiencia")).toEqual({ tab: "sobre", anchor: "experiencia" });
    expect(resolveHash("#projeto-screenmatch")).toEqual({ tab: "projetos", anchor: "projeto-screenmatch" });
    expect(resolveHash("#contato")).toBeNull();
  });

  it("links externos abrem em nova aba com rel seguro", () => {
    const { container } = render(<Index />);
    container.querySelectorAll('a[target="_blank"]').forEach((a) => {
      expect(a.getAttribute("rel")).toContain("noopener");
    });
  });
});

describe("PDI", () => {
  it("lista todos os objetivos inicialmente", () => {
    render(<PdiSection />);
    expect(screen.getAllByTestId("pdi-goal")).toHaveLength(pdiGoals.length);
  });

  it("expande um objetivo para mostrar os detalhes", () => {
    render(<PdiSection />);
    const card = screen.getAllByTestId("pdi-goal")[0];
    const trigger = within(card).getAllByRole("button")[0];
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(within(card).getByText("Plano de ação")).toBeInTheDocument();
    expect(within(card).queryByText("Justificativa")).toBeNull();
  });

  it("filtra por prazo", async () => {
    render(<PdiSection />);
    fireEvent.click(screen.getByRole("button", { name: "Curto prazo" }));
    const expected = pdiGoals.filter((g) => g.horizon === "curto").length;
    await waitFor(() => expect(screen.getAllByTestId("pdi-goal")).toHaveLength(expected));
  });
});

describe("Projetos", () => {
  it("abre o modal de detalhes com link para o GitHub", () => {
    render(<Projects />);
    fireEvent.click(screen.getByRole("button", { name: /Ver detalhes do projeto Screenmatch/ }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("Problema que resolve")).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: /Ver no GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/Mariana-Maia01/screenmatch-web",
    );
  });
});
