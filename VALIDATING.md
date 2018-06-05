# Validating Who's On First Documents and Property Definitions

This repo contains two scripts to validate WOF JSON and GeoJSON files:

* `scripts/wof-validate-docs`, a command line tool to recurse through a directory hierarchy of Who's On First documents (typically the [`whosonfirst-data`](https://github.com/whosonfirst-data/whosonfirst-data) repo) and validate them against a JSON schema.

* `scripts/wof-validate-props`, a command line tool to recurse through a directory hierarchy of property definition files (from the [`whosonfirst-properties`](https://github.com/whosonfirst/whosonfirst-properties) repo) and validate them against a JSON schema.

## Prerequisites

Both `wof-validate-docs` and `wof-validate-props` are written in [Node.js](https://nodejs.org/en/) so a working Node installation is required. If you're using Homebrew on macOS this is as simple as ...

```
$ brew install node
```

For other platforms and installation types, [alternative installs](https://nodejs.org/en/download/) are available.

## Installation

Either clone a copy of [this repo](https://github.com/whosonfirst/whosonfirst-json-schema) or download [the latest release](https://github.com/whosonfirst/whosonfirst-properties/archive/master.zip) and then use `npm` to install the repo's dependencies.

```
$ npm install
```

## Validating WOF GeoJSON Documents

### Command Line Reference

<a name="docs_dir" href="#docs_dir">#</a> `./scripts/wof-validate-docs` <b>`-d`</b> <i>`<dir>`</i>
<br><a href="#docs_dir">#</a> `./scripts/wof-validate-docs` <b>`--dir`</b> <i>`<dir>`</i>

_Required_. Specifies the root of the Who's On First document hierarchy to find GeoJSON documents to validate.

<a name="docs_pattern" href="#docs_pattern">#</a> `./scripts/wof-validate-docs` <b>`-p`</b> <i>`<regex>`</i>
<br><a href="#docs_pattern">#</a> `./scripts/wof-validate-docs` <b>`--pattern`</b> <i>`<regex>`</i>

_Optional_. Specifies a regular expression to match candidate GeoJSON documents for validation.

The default value is `[0-9]{1,}\.geojson$` which matches _master_ Who's On First document. To match _alternate_ Who's On First documents, a pattern of `[0-9]{1,}-alt-.*\.geojson$` can be used in conjunction with the `--schema` option.

<a name="docs_schema" href="#docs_schema">#</a> `./scripts/wof-validate-docs` <b>`-s`</b> <i>`<file>`</i>
<br><a href="#docs_schema">#</a> `./scripts/wof-validate-docs` <b>`--schema`</b> <i>`<file>`</i>

_Required_. Path to the top level schema file to use for validation. For _master_ documents, `schema/whosonfirst.json` should be used. For _alternate_ documents `schema/whosonfirst-alt.json` should be used.

See also the `--pattern` option for specifying _alternate_ documents should be validated.

<a name="docs_refs" href="#docs_refs">#</a> `./scripts/wof-validate-docs` <b>`-r`</b> <i>`[files]`</i>
<br><a href="#docs_refs">#</a> `./scripts/wof-validate-docs` <b>`--references`</b> <i>`[files]`</i>

_Required_. Path to one of more schema references, required as dependencies on the top level schema file.

<a name="docs_help" href="#docs_help">#</a> `./scripts/wof-validate-docs` <b>`-h`</b>
<br><a href="#docs_help">#</a> `./scripts/wof-validate-docs` <b>`--help`</b>

_Optional_. Displays help text and exits.

<a name="docs_verbose" href="#docs_verbose">#</a> `./scripts/wof-validate-docs` <b>`-v`</b>
<br><a href="#docs_verbose">#</a> `./scripts/wof-validate-docs` <b>`--verbose`</b>

_Optional_. Increases the verbosity of the output from `wof-validate-docs`. By default, `wof-validate-docs` will report only the first validation error found for a given GeoJSON document. If `--verbose` is supplied, then _all_ errors will be reported.

### Examples

```
$ ./scripts/wof-validate-docs --dir /usr/local/data/whosonfirst-data --schema schema/docs/whosonfirst.json --references schema/geojson/geojson-*.json --references schema/docs/wof-*.json
```

```
$ ./scripts/wof-validate-docs --dir /usr/local/data/whosonfirst-data --schema schema/docs/whosonfirst-alt.json --references schema/geojson/geojson-*.json --references schema/docs/wof-*.json --pattern "[0-9]{1,}-alt-.*\.geojson$"
```

## Validating WOF Property Definitions

### Command Line Reference

<a name="props_dir" href="#props_dir">#</a> `./scripts/wof-validate-props` <b>`-d`</b> <i>`<dir>`</i>
<br><a href="#props_dir">#</a> `./scripts/wof-validate-props` <b>`--dir`</b> <i>`<dir>`</i>

_Required_. Specifies the root of the property definitions directory hierarchy to find JSON documents to validate. Typically this will be `/path/to/whosonfirst-properties/properties`.

<a name="props_pattern" href="#props_pattern">#</a> `./scripts/wof-validate-props` <b>`-p`</b> <i>`<regex>`</i>
<br><a href="#props_pattern">#</a> `./scripts/wof-validate-props` <b>`--pattern`</b> <i>`<regex>`</i>

_Optional_. Specifies a regular expression to match candidate property definitions for validation.

The default value is `.*\.json$` which matches _any_ JSON document.

<a name="props_schema" href="#props_schema">#</a> `./scripts/wof-validate-props` <b>`-s`</b> <i>`<file>`</i>
<br><a href="#props_schema">#</a> `./scripts/wof-validate-props` <b>`--schema`</b> <i>`<file>`</i>

_Required_. Path to the top level schema file to use for validation, `schema/properties/properties.json` should be used.

<a name="props_help" href="#props_help">#</a> `./scripts/wof-validate-props` <b>`-h`</b>
<br><a href="#props_help">#</a> `./scripts/wof-validate-props` <b>`--help`</b>

_Optional_. Displays help text and exits.

<a name="props_verbose" href="#props_verbose">#</a> `./scripts/wof-validate-props` <b>`-v`</b>
<br><a href="#props_verbose">#</a> `./scripts/wof-validate-props` <b>`--verbose`</b>

_Optional_. Increases the verbosity of the output from `wof-validate-props`. By default, `wof-validate-props` will report only the first validation error found for a given property definition. If `--verbose` is supplied, then _all_ errors will be reported.

## Single WOF GeoJSON Document Validation using Ajv

### Dependencies

* A checked out copy of this repo
* A command line JSON schema validator. These are many and varied and work with equally varying degrees of success (see _See also_ below) but the schemas in this repo have been tested successfully using [`ajv`](https://github.com/epoberezkin/ajv) v6.1.0, which can be installed as a command line tool via [`ajv-cli`](https://github.com/jessedc/ajv-cli) by doing

```
$ npm install -g ajv-cli
```

### Invoking ajv

Assuming your current working directory is the root of this repo:
```
$ ajv -d [WOF-DOCUMENT-PATH] -s schema/docs/whosonfirst.json -r "schema/geojson/geojson-*.json" -r "schema/docs/wof-*.json" --all-errors
```

A sample successful validation might look something like this ...

```
$ ajv -d /usr/local/data/whosonfirst-data/data/101/750/367/101750367.geojson -s schema/docs/whosonfirst.json -r "schema/geojson/geojson-*.json" -r "schema/docs/wof-*.json" --all-errors
/usr/local/data/whosonfirst-data/data/101/750/367/101750367.geojson valid
```

A sample failed validation might look something like this ...

```
$ ajv -d /usr/local/data/whosonfirst-data/data/101/750/551/101750551.geojson -s schema/docs/whosonfirst.json -r "schema/geojson/geojson-*.json" -r "schema/docs/wof-*.json" --all-errors
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
