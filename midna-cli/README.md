oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g midna
$ midna COMMAND
running command...
$ midna (--version)
midna/0.0.0 darwin-arm64 node-v16.17.1
$ midna --help [COMMAND]
USAGE
  $ midna COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`midna hello PERSON`](#midna-hello-person)
* [`midna hello world`](#midna-hello-world)
* [`midna help [COMMANDS]`](#midna-help-commands)
* [`midna plugins`](#midna-plugins)
* [`midna plugins:install PLUGIN...`](#midna-pluginsinstall-plugin)
* [`midna plugins:inspect PLUGIN...`](#midna-pluginsinspect-plugin)
* [`midna plugins:install PLUGIN...`](#midna-pluginsinstall-plugin-1)
* [`midna plugins:link PLUGIN`](#midna-pluginslink-plugin)
* [`midna plugins:uninstall PLUGIN...`](#midna-pluginsuninstall-plugin)
* [`midna plugins:uninstall PLUGIN...`](#midna-pluginsuninstall-plugin-1)
* [`midna plugins:uninstall PLUGIN...`](#midna-pluginsuninstall-plugin-2)
* [`midna plugins update`](#midna-plugins-update)

## `midna hello PERSON`

Say hello

```
USAGE
  $ midna hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/NikitaVr/midna/blob/v0.0.0/dist/commands/hello/index.ts)_

## `midna hello world`

Say hello world

```
USAGE
  $ midna hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ midna hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [dist/commands/hello/world.ts](https://github.com/NikitaVr/midna/blob/v0.0.0/dist/commands/hello/world.ts)_

## `midna help [COMMANDS]`

Display help for midna.

```
USAGE
  $ midna help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for midna.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.19/src/commands/help.ts)_

## `midna plugins`

List installed plugins.

```
USAGE
  $ midna plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ midna plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.7.0/src/commands/plugins/index.ts)_

## `midna plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ midna plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ midna plugins add

EXAMPLES
  $ midna plugins:install myplugin 

  $ midna plugins:install https://github.com/someuser/someplugin

  $ midna plugins:install someuser/someplugin
```

## `midna plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ midna plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ midna plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.7.0/src/commands/plugins/inspect.ts)_

## `midna plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ midna plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ midna plugins add

EXAMPLES
  $ midna plugins:install myplugin 

  $ midna plugins:install https://github.com/someuser/someplugin

  $ midna plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.7.0/src/commands/plugins/install.ts)_

## `midna plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ midna plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ midna plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.7.0/src/commands/plugins/link.ts)_

## `midna plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ midna plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ midna plugins unlink
  $ midna plugins remove
```

## `midna plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ midna plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ midna plugins unlink
  $ midna plugins remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.7.0/src/commands/plugins/uninstall.ts)_

## `midna plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ midna plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ midna plugins unlink
  $ midna plugins remove
```

## `midna plugins update`

Update installed plugins.

```
USAGE
  $ midna plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.7.0/src/commands/plugins/update.ts)_
<!-- commandsstop -->
