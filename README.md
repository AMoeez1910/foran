# Forun-Website
# Internal Management Tool Frontend

## **Setting up the development environment**

### **Environment variables**

1. Copy `.env.local.sample` to `.env.local`
2. Reach out to us to get the environment variables.

### **Running the server**

1. Start by setting up NVM to manage node versions easily. Follow the installation [instructions](https://github.com/nvm-sh/nvm).

2. Run `nvm use` (you might need to install our specific Node.js version mentioned in `.nvmrc`)

3. Run `npm install`

4. Run the development server:

```
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000/) with your browser to see the result.

## **Contributing**

1. To contribute to this repository, you must make signed commits. For detailed instructions, refer to [GitHub's documentation on commit signature verification](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification).

2. For each ticket assigned to you on Linear, copy the branch name from Linear to keep things organized.

3. Each commit will trigger pre-commit checks, including formatting, ESLint, and other validations. Ensure these checks pass to successfully commit your changes. If any check fails, you will need to address the issues before committing.
To run the checks manually:
    ```jsx
    npm run prettier
    npm run lint:fix
    ```

## **Coding conventions**

### **Naming and folder structure**

| Instance | Convention | Example |
| --- | --- | --- |
| Pages | lower-case | /app/organization/feedback-request/page.tsx |
| Details page | Append Id directly, no need to add /view | /app/organization/people/[id]/page.tsx |
| Edit page | Append edit directly after [id] | /app/organization/people/[id]/edit/page.tsx |
| Create/Add new page | /create should be the path to create or add new | /app/organization/people/create.tsx |
| Components files | lower-case | /app/components/ui/date-picker.tsx |
| UI components (components independent  of features) | Place under /app/components/ui/ | /app/components/ui/date-picker.tsx |
| Feature components | Place under /app/components/features/[feature-name] | /app/components/features/peopleManagement/resource-form.tsx |
| CSS selectors | camelCase | styles.topBar |
| Style files | lower-case | /styles/lower-case-style-file.module.css |
| Variables & constants | camelCase | let myTestVariable OR const myTestConst |
| Component interfaces | Component name appended with `I` | e.g. \<Button /\> would have interface `ButtonI` |
| Form schemas | camelCase | src/schema/resourceFormSchema.ts |

### **Components**

**Images**

Never use the html `<img />` tag. Always use the `Next/Image` component to ensure we get the full benefit of NextJS image optimisations.

**Rendering SVGs**

We should avoid rendering SVGs using `Image` components. Always use `ReactSVG`. SVGs rendered as images are not able to leverage the full performance benefit of vector graphics.

**Avoid default exports**

In this project, we encourage avoiding default exports. Default exports allow developers to give any name during import, and this flexibility can lead to varying names being used across the project, potentially causing confusion. Instead, prefer named exports to provide clarity and consistency when importing modules. This practice helps maintain a more structured and understandable codebase.

**Avoid creating components based on features**

Our UI components should not be built based on features. We want to follow a pattern similar to MaterialUI and other component libraries where the component is indepenent of application logic. Components would be for things like `ProgressBar`, `DataTable`, `Navbar`, `Button` etc. instead of being for features such as `InfoSection`, `FinancialSection`.

**Make it easy to override**

1. All components should have an optional `className` prop and the default value overriden to an empty string. This prop would allow overriding container styles.

**This raises a question about how would we handle feature specific components?** For example a component called `InfoSection` is relevant for 4 pages and we want to consolidate that too. We can definitely create those components. However, we would want to have a logical seperation between UI components and feature components. Feature components should be placed in `/src/app/components/features` whereas UI components should be place in `/src/app/components/ui`. UI components should be indepenednt and should never import anything from features.

### **Avoid using "any" in typescript**

Every variable, unless it infers the type appropriately, should have a type assigned to it. We should avoid using `any` as much as we can as we lose the benefit of TypeScript with this.

### **Styles**

**Global**

We ideally want to keep are `globals.css` limited to project level styles such as font faces, global styles on body etc. Styles such as `pageHeading`, `loader-container` etc. should have their own UI components. We would want to keep `globals.css` extremely lean as this isn't scoped and can easily create conflicting selectors as the project scales. Always prefer TailwindCSS to style your components.

**Variables**

We should use our `variables.css` wherever possible. This can be used for things like colors, shared heights of various components. So using `var(--primary-dark)` instead of adding the color manually for each instance.

### Forms

Always use React Hook Form with Zod validations for forms. Place form schemas under `/src/schema`. For sample implementation, see `src/app/signin/page.tsx` .

### Icons

If custom icons are not needed, prefer using icons from [Lucid React](https://lucide.dev/icons/)

## Technologies used

| Technology | Usage |
| --- | --- |
| NextJs App Router | Frontend framework |
| Shadcn | A collection of re-usable components |
| TailwindCSS | Styling |
| React Hook Form | Simplifies forms |
| Zod | Form validations |
| Lucid React | Icons |
