<p align="center">
  <img src="https://github.com/jackanakin/jackchat-canvas/blob/main/react-flow-header.png?raw=true" alt="React Flow Header" />
</p>

# K-Golem Designer Demo (Vite + TS + React-Flow)
<div align="center">
  
[![Node.js CI](https://github.com/jackanakin/jackchat-canvas/actions/workflows/node.js.yml/badge.svg)](https://github.com/jackanakin/jackchat-canvas/actions/workflows/node.js.yml)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jackanakin_kgolem-designer&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jackanakin_kgolem-designer)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jackanakin_kgolem-designer&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jackanakin_kgolem-designer)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=jackanakin_kgolem-designer&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=jackanakin_kgolem-designer)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jackanakin_kgolem-designer&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jackanakin_kgolem-designer)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=jackanakin_kgolem-designer&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=jackanakin_kgolem-designer)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jackanakin_kgolem-designer&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jackanakin_kgolem-designer)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jackanakin_kgolem-designer&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jackanakin_kgolem-designer)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jackanakin_kgolem-designer&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jackanakin_kgolem-designer)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jackanakin_kgolem-designer&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jackanakin_kgolem-designer)

[Live Demo](https://jackanakin.github.io/kgolem-designer)

</div>

![](https://github.com/jackanakin/kgolem-designer/blob/main/history/components/06102024.png?raw=true)

## Getting up and running

```bash
npm install # or `pnpm install` or `yarn install`
```

Vite is a great development server and build tool that we recommend our users to
use. You can start a development server with:

```bash
npm run dev
```

While the development server is running, changes you make to the code will be
automatically reflected in the browser!

<details>
  <summary><strong>Sketches</strong></summary>

</details>

<details>
  <summary><strong>Components</strong></summary>
  
</details>

<details>
  <summary><strong>Stack</strong></summary>
</details>

## Credits | The xyflow team (09/2024)

React Flow and Svelte Flow are maintained by the team behind [xyflow](https://xyflow.com). If you need help or want to talk to us about a collaboration, reach out through our [contact form](https://xyflow.com/contact) or by joining our [Discord Server](https://discord.gg/Bqt6xrs).

- Christopher • [Twitter](https://twitter.com/chrtze) • [Github](https://github.com/chrtze)
- Hayleigh • [Twitter](https://twitter.com/hayleighdotdev) • [Github](https://github.com/hayleigh-dot-dev)
- John • [Website](https://johnrobbdesign.com/) • [Mastodon](https://mastodon.social/@johnrobbjr)
- Moritz • [Twitter](https://twitter.com/moklick) • [Github](https://github.com/moklick)
- Peter • [Github](https://github.com/peterkogo)

## Resources

Links:

- [React Flow - Docs](https://reactflow.dev)

Learn:

- [React Flow – Custom Nodes](https://reactflow.dev/learn/customization/custom-nodes)
- [React Flow – Layouting](https://reactflow.dev/learn/layouting/layouting)

### TODO
- Persistence service [api]
- Export[json, png]
- Node options CRUD (modal, editors)
- refactor uuid? props to Partial<>
- improve errors and exceptions thrown
- Implement queue for syncronized operations
- Refactor designer provider functions into services

## ISSUES
- edges cleanup
- when an option is removed, must remove the edges
- when an element is removed, must remove the edges