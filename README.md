# My Studio MS (demo)

Applicazione **Next.js** solo frontend per mostrare il portale clienti e il backoffice di uno studio commercialistico. Dati, autenticazione e file sono **fittizi** (nessun backend).

## Requisiti

- **Node.js 22** (vedi [`.nvmrc`](.nvmrc) e `engines` in `package.json`). In WSL, usa `nvm use` o il Node di sistema, non quello in bundle con l’editor se diverso.

## Comandi

```bash
npm install
npm run dev
```

Build di produzione (come su Vercel):

```bash
npm run build
npm start
```

## Deploy (Vercel)

Importa la repo, imposta il runtime **Node 22** nel progetto se non lo rileva da `package.json` / Vercel defaults.

## Accesso demo

Password per tutti gli account: **`demo`**

| Profilo        | Email                  | Note                    |
| -------------- | ---------------------- | ----------------------- |
| Cliente Alpha  | `cliente.alpha@demo.it` | Azienda Alpha S.r.l.    |
| Cliente Beta   | `cliente.beta@demo.it`  | Beta Consulting S.p.A.  |
| Backoffice     | `studio@demo.it`        | Pannello Studio         |

- Area cliente: [`/c/dashboard`](./src/app/c/dashboard) (dopo login).
- Backoffice: [`/studio`](./src/app/studio).

## Contenuto

- Dashboard KPI, grafici (Recharts), filtri periodo/centro, export su file in [`public/mocks/`](public/mocks).
- Conto economico analitica, documenti, scadenze fiscali (calendario + `.ics` generato in browser).
- Backoffice: riepilogo, clienti/utenti, caricamenti (simulazione upload, stato in memoria per sessione).

## Limiti

Nessun parsing Excel reale, nessun calcolo lato server, nessuna sicurezza sull’autenticazione (cookie demo, middleware solo per percorso).

Palette e tipografia in [`src/app/globals.css`](src/app/globals.css) ispirata a [Studio Scuderi](https://studiomarioscuderi.com/) (marchi e testi ufficiali restano del titolare).
