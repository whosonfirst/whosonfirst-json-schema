# Validating Who's On First Documents

This repo contains `wof-validate`, a command line tool to recurse through a directory hierarchy of Who's On First documents and validate them against their JSON schema.

## Prerequisites

`wof-validate` is written in [Node.js](https://nodejs.org/en/) so a working Node installation is required. If you're using Homebrew on macOS this is as simple as ...

```
$ brew install node
```

For other platforms and installation types, [alternative installs](https://nodejs.org/en/download/) are available.

## Installation

Either clone a copy of [this repo](https://github.com/whosonfirst/whosonfirst-json-schema) or download [the latest release](https://github.com/whosonfirst/whosonfirst-json-schema/archive/gg-schema-rework.zip) and then use `npm` to install `wof-validate`'s dependencies.

```
$ npm install
```

## Command Line Reference

<a name="validate_dir" href="#validate_dir">#</a> `./bin/wof-validate` <b>`-d`</b> <i>`<dir>`</i>
<br><a href="#validate_dir">#</a> `./bin/wof-validate` <b>`--dir`</b> <i>`<dir>`</i>

_Required_. Specifies the root of the Who's On First document hierarchy to find GeoJSON documents to validate.

<a name="validate_pattern" href="#validate_pattern">#</a> `./bin/wof-validate` <b>`-p`</b> <i>`<regex>`</i>
<br><a href="#validate_pattern">#</a> `./bin/wof-validate` <b>`--pattern`</b> <i>`<regex>`</i>

_Optional_. Specifies a regular expression to match candidate GeoJSON documents for validation.

The default value is `[0-9]{1,}\.geojson$` which matches _master_ Who's On First document. To match _alternate_ Who's On First documents, a pattern of `[0-9]{1,}-alt-.*\.geojson$` can be used in conjunction with the `--schema` option.

<a name="validate_schema" href="#validate_schema">#</a> `./bin/wof-validate` <b>`-s`</b> <i>`<file>`</i>
<br><a href="#validate_schema">#</a> `./bin/wof-validate` <b>`--schema`</b> <i>`<file>`</i>

_Required_. Path to the top level schema file to use for validation. For _master_ documents, `schema/whosonfirst.json` should be used. For _alternate_ documents `schema/whosonfirst-alt.json` should be used.

See also the `--pattern` option for specifying _alternate_ documents should be validated.

<a name="validate_refs" href="#validate_refs">#</a> `./bin/wof-validate` <b>`-r`</b> <i>`[files]`</i>
<br><a href="#validate_refs">#</a> `./bin/wof-validate` <b>`--references`</b> <i>`[files]`</i>

_Required_. Path to one of more schema references, required as dependencies on the top level schema file.

<a name="validate_help" href="#validate_help">#</a> `./bin/wof-validate` <b>`-h`</b>
<br><a href="#validate_help">#</a> `./bin/wof-validate` <b>`--help`</b>

_Optional_. Displays help text and exits.

<a name="validate_verbose" href="#validate_verbose">#</a> `./bin/wof-validate` <b>`-v`</b>
<br><a href="#validate_verbose">#</a> `./bin/wof-validate` <b>`--verbose`</b>

_Optional_. Increases the verbosity of the output from `wof-validate`. By default, `wof-validate` will report only the first validation error found for a given GeoJSON document. If `--verbose` is supplied, then _all_ errors will be reported.

## Examples

```
$ ./bin/wof-validate --dir /usr/local/data/whosonfirst-data --schema schema/whosonfirst.json --references schema/geojson-*.json --references schema/wof-hierarchy.json
```

```
$ ./bin/wof-validate --dir /usr/local/data/whosonfirst-data --schema schema/whosonfirst-alt.json --references schema/geojson-*.json --references schema/wof-hierarchy.json --pattern "[0-9]{1,}-alt-.*\.geojson$"
```

## Single Document Validation using Ajv

### Dependencies

* A checked out copy of this repo
* A command line JSON schema validator. These are many and varied and work with equally varying degrees of success (see _See also_ below) but the schemas in this repo have been tested successfully using [`ajv`](https://github.com/epoberezkin/ajv) v6.1.0, which can be installed as a command line tool via [`ajv-cli`](https://github.com/jessedc/ajv-cli) by doing

```
$ npm install -g ajv-cli
```

### Invoking ajv

Assuming your current working directory is the root of this repo:
```
$ ajv -d [WOF-DOCUMENT-PATH] -s schema/whosonfirst.json -r "schema/geojson-*.json" -r "schema/wof-*.json" --all-errors
```

A sample successful validation might look something like this ...

```
$ ajv -d /usr/local/data/whosonfirst-data/data/101/750/367/101750367.geojson -s schema/whosonfirst.json -r "schema/geojson-*.json" -r "schema/wof-*.json" --all-errors
/usr/local/data/whosonfirst-data/data/101/750/367/101750367.geojson valid
```

A sample failed validation might look something like this ...

```
$ ajv -d /usr/local/data/whosonfirst-data/data/101/750/551/101750551.geojson -s schema/whosonfirst.json -r "schema/geojson-*.json" -r "schema/wof-*.json" --all-errors
/usr/local/data/whosonfirst-data/data/101/750/551/101750551.geojson invalid
[ { keyword: 'type',
    dataPath: '.properties[\'wof:belongsto\'][1]',
    schemaPath: '#/properties/properties/properties/wof%3Abelongsto/items/type',
    params: { type: 'integer' },
    message: 'should be integer' },
  { keyword: 'type',
    dataPath: '.properties[\'wof:hierarchy\'][0].continent_id',
    schemaPath: 'wof-hierarchy.json#/definitions/wof-hierarchy/properties/continent_id/type',
    params: { type: 'integer' },
    message: 'should be integer' } ]
```