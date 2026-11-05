# Natal/Hardware

> **Licença proprietária:** este repositório é público apenas para visualização. O projeto não pode ser copiado, reutilizado, modificado, redistribuído ou publicado sem autorização prévia. Consulte [LICENSE](./LICENSE).

Vitrine de e-commerce sem backend, feita com Vite + React + TypeScript. A compra acontece por contato direto no WhatsApp: **(84) 99215-7903**. Atendimento e entrega somente em Natal/RN; não existe checkout online.

## Rodar localmente

```bash
npm install
npm run dev
```

## Editar produtos

Abra `src/main.tsx` e edite a lista `products`. Cada produto possui `name`, `category`, `price`, `description`, `specs`, `stock`, `accent` e, opcionalmente, `tag`. O link do WhatsApp é montado automaticamente com o nome do item.

## Build

`npm run build` gera a versão publicada em `dist/`.
