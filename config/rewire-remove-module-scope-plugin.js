function rewireRemoveModuleScopePlugin(config) {
  if (config.resolve.plugins) {
    const moduleScopePluginIndex = config.resolve.plugins.findIndex(plugin =>
      plugin.constructor.name.includes('ModuleScopePlugin'),
    );
    config.resolve.plugins.splice(moduleScopePluginIndex, 1);
  }

  return config;
}

module.exports = rewireRemoveModuleScopePlugin;
