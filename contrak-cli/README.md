# oclif-hello-world

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g @contrak/cli
$ contrak COMMAND
running command...
$ contrak (--version)
@contrak/cli/0.0.0 darwin-arm64 node-v18.16.1
$ contrak --help [COMMAND]
USAGE
  $ contrak COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`contrak connect CONTRACTNAME CHAINID CONTRACTADDRESS CONTRACTDEPLOYMENTTRANSACTIONHASH ORGPUBLICKEY`](#contrak-connect-contractname-chainid-contractaddress-contractdeploymenttransactionhash-orgpublickey)
- [`contrak connect-foundry CONTRACTNAME CHAINID CONTRACTADDRESS CONTRACTDEPLOYMENTTRANSACTIONHASH ORGPUBLICKEY`](#contrak-connect-foundry-contractname-chainid-contractaddress-contractdeploymenttransactionhash-orgpublickey)
- [`contrak help [COMMANDS]`](#contrak-help-commands)
- [`contrak plugins`](#contrak-plugins)
- [`contrak plugins:install PLUGIN...`](#contrak-pluginsinstall-plugin)
- [`contrak plugins:inspect PLUGIN...`](#contrak-pluginsinspect-plugin)
- [`contrak plugins:install PLUGIN...`](#contrak-pluginsinstall-plugin-1)
- [`contrak plugins:link PLUGIN`](#contrak-pluginslink-plugin)
- [`contrak plugins:uninstall PLUGIN...`](#contrak-pluginsuninstall-plugin)
- [`contrak plugins:uninstall PLUGIN...`](#contrak-pluginsuninstall-plugin-1)
- [`contrak plugins:uninstall PLUGIN...`](#contrak-pluginsuninstall-plugin-2)
- [`contrak plugins update`](#contrak-plugins-update)
- [`contrak verify MESSAGE SIGNATURE TRANSACTIONHASH`](#contrak-verify-message-signature-transactionhash)

## `contrak connect CONTRACTNAME CHAINID CONTRACTADDRESS CONTRACTDEPLOYMENTTRANSACTIONHASH ORGPUBLICKEY`

Sign a message that says a contract belongs to an organization

```
USAGE
  $ contrak connect CONTRACTNAME CHAINID CONTRACTADDRESS CONTRACTDEPLOYMENTTRANSACTIONHASH ORGPUBLICKEY

ARGUMENTS
  CONTRACTNAME                       Name of the deployed contract
  CHAINID                            ID of the Chain that the contract is deployed on
  CONTRACTADDRESS                    Address of the Contract that will be owned by the organization
  CONTRACTDEPLOYMENTTRANSACTIONHASH  Transaction Hash that deployed the contract that will be owned by the organization
  ORGPUBLICKEY                       Public Key of the Organization that owns the contract

DESCRIPTION
  Sign a message that says a contract belongs to an organization
```

_See code: [dist/commands/connect/index.ts](https://github.com/NikitaVr/contrak/blob/v0.0.0/dist/commands/connect/index.ts)_

## `contrak connect-foundry CONTRACTNAME CHAINID CONTRACTADDRESS CONTRACTDEPLOYMENTTRANSACTIONHASH ORGPUBLICKEY`

Sign a message that says a contract belongs to an organization

```
USAGE
  $ contrak connect-foundry CONTRACTNAME CHAINID CONTRACTADDRESS CONTRACTDEPLOYMENTTRANSACTIONHASH ORGPUBLICKEY

ARGUMENTS
  CONTRACTNAME                       Name of the deployed contract
  CHAINID                            ID of the Chain that the contract is deployed on
  CONTRACTADDRESS                    Address of the Contract that will be owned by the organization
  CONTRACTDEPLOYMENTTRANSACTIONHASH  Transaction Hash that deployed the contract that will be owned by the organization
  ORGPUBLICKEY                       Public Key of the Organization that owns the contract

DESCRIPTION
  Sign a message that says a contract belongs to an organization
```

_See code: [dist/commands/connect-foundry/index.ts](https://github.com/NikitaVr/contrak/blob/v0.0.0/dist/commands/connect-foundry/index.ts)_

## `contrak help [COMMANDS]`

Display help for contrak.

```
USAGE
  $ contrak help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for contrak.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.19/src/commands/help.ts)_

## `contrak plugins`

List installed plugins.

```
USAGE
  $ contrak plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ contrak plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.8.0/src/commands/plugins/index.ts)_

## `contrak plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ contrak plugins:install PLUGIN...

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
  $ contrak plugins add

EXAMPLES
  $ contrak plugins:install myplugin

  $ contrak plugins:install https://github.com/someuser/someplugin

  $ contrak plugins:install someuser/someplugin
```

## `contrak plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ contrak plugins:inspect PLUGIN...

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
  $ contrak plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.8.0/src/commands/plugins/inspect.ts)_

## `contrak plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ contrak plugins:install PLUGIN...

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
  $ contrak plugins add

EXAMPLES
  $ contrak plugins:install myplugin

  $ contrak plugins:install https://github.com/someuser/someplugin

  $ contrak plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.8.0/src/commands/plugins/install.ts)_

## `contrak plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ contrak plugins:link PLUGIN

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
  $ contrak plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.8.0/src/commands/plugins/link.ts)_

## `contrak plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ contrak plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ contrak plugins unlink
  $ contrak plugins remove
```

## `contrak plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ contrak plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ contrak plugins unlink
  $ contrak plugins remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.8.0/src/commands/plugins/uninstall.ts)_

## `contrak plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ contrak plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ contrak plugins unlink
  $ contrak plugins remove
```

## `contrak plugins update`

Update installed plugins.

```
USAGE
  $ contrak plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.8.0/src/commands/plugins/update.ts)_

## `contrak verify MESSAGE SIGNATURE TRANSACTIONHASH`

Sign a message that says a contract belongs to an organization

```
USAGE
  $ contrak verify MESSAGE SIGNATURE TRANSACTIONHASH

ARGUMENTS
  MESSAGE          The raw message
  SIGNATURE        The signature of the message
  TRANSACTIONHASH  The transaction hash where the contract was deployed

DESCRIPTION
  Sign a message that says a contract belongs to an organization
```

_See code: [dist/commands/verify/index.ts](https://github.com/NikitaVr/contrak/blob/v0.0.0/dist/commands/verify/index.ts)_

<!-- commandsstop -->
