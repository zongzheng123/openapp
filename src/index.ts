#!/usr/bin/env node

import { Command } from "commander";
import { existsSync } from "fs";
import _ from "lodash";
import path from "path";
import open, {openApp, apps, App} from 'open';
import { ensureFileSync, outputJSONSync } from 'fs-extra'


type BrowserConfig = {
  [key: string]: string;
};

type Config = {
  defaultBrowser: App;
  defaultPlatform: string;
  platforms: {
    [key: string]: typeof key extends "browser"
      ? BrowserConfig
      : Record<string, any>;
  };
};

const projectPath = process.cwd();

const getProjectConfig = () => {
  const configPath = path.join(projectPath, "./open.config.json");
  if (existsSync(configPath)) {
    const config = require(configPath);
    return config;
  }
  return {};
};

const getPackageJsonProjectConfig = () => {
  const packageJsonPath = path.join(projectPath, "./package.json");
  if (existsSync(packageJsonPath)) {
    const packageJson = require(packageJsonPath);
    return packageJson.open;
  }
  return {};
};


const defaultConfig = {
  defaultPlatform: "browser",
  platforms: {
    browser: {
      github: "https://github.com",
    }
  }
}
const projectConfig: Config = _.merge(
  defaultConfig,
  getProjectConfig(),
  getPackageJsonProjectConfig()
);

const openapp = async (program: Command, name: string, options: any) => {
  if (options.browser) {
    projectConfig.defaultBrowser = options.browser;
  }
  let url = projectConfig.platforms[projectConfig.defaultPlatform][name];
  if (!url && name?.includes("://")) {
    url = name;
  }
  if (!url) {
    program.help()
  }
  if (projectConfig.defaultPlatform === 'browser') {
    open(url, { app: projectConfig.defaultBrowser });
  }
}

function main() {
  const program = new Command();
  const packageJson = require("../package.json");


  program.usage("[name] [options]");

  program.version(packageJson.version);

  program
    .argument("[name]", "app or website name or url")
    .option("-b, --browser <type>", "browser type")
    .option("-i, --init", "init a config file")
    .action((name: string, options) => {
      if (options.init) {
         const jsonFilePath = path.join(projectPath, "./open.config.json")
         ensureFileSync(jsonFilePath)
          outputJSONSync(jsonFilePath, defaultConfig, { spaces: 2 })
         return
      }
      openapp(program, name, options);
    });

  program.parse();
}

main();
