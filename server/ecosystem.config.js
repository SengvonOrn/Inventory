module.exports = {
  apps: {
    name: "Inventory",
    script: "npm",
    args: "run dev",
    env: {
      NODE_ENV: "development",
      ENV_VAR1: "evironment-variable",
    },
  },
};
