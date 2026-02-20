+++
date = '2026-02-06T14:10:03Z'
title = 'Cobra and Viper Quickstart'
hideReply = true
tags = ['computer-science', 'programming', 'golang']
+++

Cobra & Viper Quickstart

## Cobra

[Cobra](https://github.com/spf13/cobra) is a library for building CLI applications with commands, subcommands, and flags.

### Install

```bash
go get -u github.com/spf13/cobra/cobra
```

### Structure

A typical Cobra project separates each command into its own file under a `cmd/` directory.

```
cmd/
  root.go    # root command
  serve.go   # subcommand
main.go
```

### main.go

The entrypoint simply calls into the cmd package. All CLI logic lives there.

```go
package main

import "myapp/cmd"

func main() {
    cmd.Execute()
}
```

### cmd/root.go

Define the root command as a package-level variable. `Use` is the command name, `Short` is the help text, and `Run` contains the logic. `Execute()` is the public entrypoint that parses args and runs the appropriate command.

```go
package cmd

import (
    "fmt"
    "os"
    "github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
    Use:   "myapp",
    Short: "Short description",
    Run: func(cmd *cobra.Command, args []string) {
        fmt.Println("hello")
    },
}

func Execute() {
    if err := rootCmd.Execute(); err != nil {
        os.Exit(1)
    }
}
```

### Adding a subcommand (cmd/serve.go)

Subcommands are defined similarly. Use `init()` to register flags and attach the subcommand to its parent. `IntVarP` binds the flag to a variable — the `P` variant adds a short flag (`-p`).

```go
package cmd

import "github.com/spf13/cobra"

var port int

var serveCmd = &cobra.Command{
    Use:   "serve",
    Short: "Start server",
    Run: func(cmd *cobra.Command, args []string) {
        // use port here
    },
}

func init() {
    serveCmd.Flags().IntVarP(&port, "port", "p", 8080, "port number")
    rootCmd.AddCommand(serveCmd)
}
```

### Usage

```bash
myapp              # runs root
myapp serve -p 3000  # runs subcommand with flag
```

### Key concepts

- `Use` — command name
- `Short`/`Long` — help text
- `Run` — the actual logic
- `Flags()` — command-specific flags
- `PersistentFlags()` — inherited by subcommands
- `Args` — positional argument validation (`cobra.ExactArgs(1)`, `cobra.MinimumNArgs(1)`, etc.)

---

## Viper

[Viper](https://github.com/spf13/viper) handles configuration from files, environment variables, and flags with a unified API.

### Install

```bash
go get -u github.com/spf13/viper
```

### Basic usage

Set defaults first, then tell Viper where to look for config files. `AddConfigPath` can be called multiple times to search multiple directories. Use typed getters to retrieve values.

```go
import "github.com/spf13/viper"

func init() {
    // Set defaults
    viper.SetDefault("port", 8080)
    viper.SetDefault("debug", false)

    // Config file
    viper.SetConfigName("config")       // config.yaml, config.json, etc.
    viper.SetConfigType("yaml")         // explicit format
    viper.AddConfigPath(".")            // look in current dir
    viper.AddConfigPath("$HOME/.myapp") // then home dir

    if err := viper.ReadInConfig(); err != nil {
        // handle missing config (often optional)
    }
}

func main() {
    port := viper.GetInt("port")
    debug := viper.GetBool("debug")
    name := viper.GetString("name")
}
```

### Example config.yaml

Viper supports YAML, JSON, TOML, and other formats. Nested structures are supported.

```yaml
port: 3000
debug: true
name: myapp
database:
  host: localhost
  port: 5432
```

### Nested keys

Access nested values using dot notation.

```go
viper.GetString("database.host")  // "localhost"
```

### Environment variables

`AutomaticEnv` makes Viper check for env vars matching config keys. `SetEnvPrefix` adds a prefix to avoid collisions. The replacer maps nested keys (dots) to underscores for env var names.

```go
viper.AutomaticEnv()                                    // reads MYAPP_PORT, etc.
viper.SetEnvPrefix("MYAPP")                             // prefix for env vars
viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))  // database.host → DATABASE_HOST
```

### Cobra integration

Bind Cobra flags to Viper keys with `BindPFlag`. This unifies CLI flags, env vars, and config files under one key — Viper resolves them in priority order.

```go
var rootCmd = &cobra.Command{...}

func init() {
    rootCmd.Flags().IntP("port", "p", 8080, "port")
    viper.BindPFlag("port", rootCmd.Flags().Lookup("port"))
}
```

Priority: flag > env > config > default

### Unmarshal to struct

Map the entire config to a struct. Use `mapstructure` tags to match keys to fields.

```go
type Config struct {
    Port  int      `mapstructure:"port"`
    Debug bool     `mapstructure:"debug"`
    DB    DBConfig `mapstructure:"database"`
}

var cfg Config
viper.Unmarshal(&cfg)
```

### Watch for changes

Viper can watch the config file and trigger a callback on changes. Useful for live-reloading configuration.

```go
viper.WatchConfig()
viper.OnConfigChange(func(e fsnotify.Event) {
    fmt.Println("config changed:", e.Name)
})
```
