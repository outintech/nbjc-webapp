module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.jsx',
        templateFile: 'plop-templates/Component.jsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.md',
        templateFile: 'plop-templates/Component.md.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.test.jsx',
        templateFile: 'plop-templates/Component.test.jsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.js',
        templateFile: 'plop-templates/ComponentIndex.js.hbs',
      },
    ],
  });
  plop.setGenerator('route', {
    description: 'Create a route',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your route name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/routes/{{pascalCase name}}/{{pascalCase name}}.jsx',
        templateFile: 'plop-templates/Route.jsx.hbs',
      },
      {
        type: 'add',
        path: 'src/routes/{{pascalCase name}}/{{pascalCase name}}.test.jsx',
        templateFile: 'plop-templates/Route.test.jsx.hbs',
      },
      {
        type: 'add',
        path: 'src/routes/{{pascalCase name}}/index.js',
        templateFile: 'plop-templates/RouteIndex.js.hbs',
      },
    ],
  });
};
