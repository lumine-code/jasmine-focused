(function() {
  var Jasmine, focusMethods, globals, i, jasmine, len, methodBody, methodName, object, setGlobalFocusPriority;

  if (global.jasmine != null) {
    jasmine = global.jasmine;
  } else {
    Jasmine = require('jasmine');
    new Jasmine();
    jasmine = global.jasmine;
  }

  setGlobalFocusPriority = function(priority) {
    var env;
    env = jasmine.getEnv();
    if (!env.focusPriority) {
      env.focusPriority = 1;
    }
    if (priority > env.focusPriority) {
      return env.focusPriority = priority;
    }
  };

  focusMethods = {
    fdescribe: function(description, specDefinitions, priority = 1) {
      var suite;
      setGlobalFocusPriority(priority);
      suite = describe(description, specDefinitions);
      suite.focusPriority = priority;
      return suite;
    },
    ffdescribe: function(description, specDefinitions) {
      return this.fdescribe(description, specDefinitions, 2);
    },
    fffdescribe: function(description, specDefinitions) {
      return this.fdescribe(description, specDefinitions, 3);
    },
    fit: function(description, definition, priority = 1) {
      var spec;
      setGlobalFocusPriority(priority);
      spec = it(description, definition);
      spec.focusPriority = priority;
      return spec;
    },
    ffit: function(description, specDefinitions) {
      return this.fit(description, specDefinitions, 2);
    },
    fffit: function(description, specDefinitions) {
      return this.fit(description, specDefinitions, 3);
    }
  };

  globals = [];

  if (typeof global !== "undefined" && global !== null) {
    globals.push(global);
  }

  if (typeof window !== "undefined" && window !== null) {
    globals.push(window);
  }

  for (methodName in focusMethods) {
    methodBody = focusMethods[methodName];
    for (i = 0, len = globals.length; i < len; i++) {
      object = globals[i];
      object[methodName] = methodBody;
    }
  }

  jasmine.getEnv().specFilter = function(spec) {
    var env, globalFocusPriority, parent, ref;
    env = jasmine.getEnv();
    globalFocusPriority = env.focusPriority;
    parent = (ref = spec.parentSuite) != null ? ref : spec.suite;
    if (!globalFocusPriority) {
      return true;
    } else if (spec.focusPriority >= globalFocusPriority) {
      return true;
    } else if (!parent) {
      return false;
    } else {
      return env.specFilter(parent);
    }
  };

  module.exports = jasmine;

}).call(this);
