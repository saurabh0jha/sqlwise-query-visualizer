# SQL Wise Query Visualizer

A simple application to run queries on selected data sources. Results of the query on the datasource is displayed to the user.
The user will be able to run operations on data like exporting selection, pagination, sharing links

## Frameworks and Libraries

- React with TypeScript
- Vite for bootstrapping and HMR
- ShadCN UI components
- ShadCN Table with Tanstack react-table and react-virtuoso for virtualization
- Lucide react for icons
- useReducer for data management

## Data Sources

- CSV files located at https://github.com/graphql-compose/graphql-compose-examples/tree/master/examples/northwind/data/csv

Uses Vite with HMR and some ESLint rules.

## Requirements

### Must Have

1. User should be able to add, view, edit, save their SQL queries.
2. User should be able to view the results of the queries in a friendly format.
3. User should be able to export the query results.
4. User should be able to add new query workspace by choosing the initial datasource and optionally adding a query workspace name.
5. User should be able to edit the query workspace name.
6. User should be able to share the query they write with colleagues.
7. User should be able to use and load the application easily. As data can be huge, performance is important - needs pagination and virtualization to speedup render perf.
8. User should be able to access their queries and workspaces easily.

### Good to have

1. Sorting and filtering data - we will assume majority of user have a basic grasp on SQL which provides powerful sorting and filtering constructs. So visual sort/filter is of slightly lesser importance.

2. Copying or exporting selection of data - can be done easily using SQL SELECT construct. So visual selection and export is a good to have.

3. User should be able to view all available datasources in their workspace.

4. User should be able to copy and share their queries easily.

### Decision logs

#### Codebase - Typescript or not

- Typescript makes the application future proof in terms of scaling by catching errors in complex scenarios.

#### UX - Pagination vs Infinite scroll

- [Norman Nielsen: When to use and when to avoid infinite scroll](https://www.nngroup.com/articles/infinite-scrolling-tips/)

- [Smashing Magazine better infinite scroll](https://www.smashingmagazine.com/2022/03/designing-better-infinite-scroll/)

#### UX - Modal vs sidebar (new query)

- [Modal UX design best practices](https://blog.logrocket.com/ux-design/modal-ux-design-patterns-examples-best-practices/)

- [Norman Nielsen - modals vs non-modals](https://www.nngroup.com/articles/modal-nonmodal-dialog/)

- [When to use a modal and when to redirect page](https://uxplanet.org/modal-vs-page-a-decision-making-framework-34453e911129)

#### UX - Horizontal tab view for query workspace vs left side vertical links

- [Norman Nielsen - When to use left side vertical navigation](https://www.nngroup.com/articles/vertical-nav/)

- [Medium ](https://medium.com/swlh/top-navigation-vs-side-navigation-for-your-interface-3c1f176bc6ae)
