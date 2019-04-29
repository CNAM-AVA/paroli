# Paroli

Reddit like website.

## Installation & run

Install npm dependencies
```
npm install
```
Run local development server (localhost:3000)
```
npm run dev
```

## Custom components API

The app custom components with usage.

### DashboardCard

#### Props

* title - Card title
* linkTitle - Title of the clickable link
* link - Onclick destination link
* icon - card's icon
* child components - Card's content

The following icons are available:

- list
- flipToFront
- turnedInNot

Usage:

```html
<DashboardCard icon={"list"} title={"bulder"} linkTitle={"Go to builder"} link={"/builder"}>
  <p>Card's content</p>
</DashboardCard>
```

## Guide des commits

La section suivante ne concerne pas l'installation, seulement les consignes de commit sur Git.

#### Architecture

Each page should contain a folder in the components directory. Shared components should be in a common folder.

### Branches

 - database: firebase related stuff
 - pages: contains de page branchs
 - homepage: code for the homepage
 - sub homepage: code for the sub homepage
 - user settings: code for the user settings page
 - user page: code for the user page
 - post page: code for the post page
 

### Commit guidelines

Each commit should follow a common patern, containing a header, body and footer. The header contains a <b>type</b>, a <b>scope</b> and a <b>subject</b>.

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### Type

- <b>build</b>:  Changements qui affectent le système de build ou les dépendances externes (ex: gulp, broccoli, npm)
- <b>docs</b>: Documentation
- <b>trad</b>: Traductions
- <b>fix</b>: Résolution d'un bug
- <b>style</b>: Changement liés au style
- <b>feat</b>: Nouvelle fonctionnalité
- <b>refactor</b>: Refactor du code

### Scope - optionnel

- <b>animation</b>
- <b>forms</b>
- <b>routes</b>
- <b>core</b>
- <b>upgrade</b>
- <b>packaging</b> Packages npm etc.
