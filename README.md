# whosonfirst-json-schema

JSON Schema definitions for Who's On First documents

## JSON Schema Version

The schemas in this repo have been written to conform to [JSON Schema v0.6 draft](http://json-schema.org/specification-links.html#draft-6) (note to self: when _will_ JSON Schema ever reach version 1.0 and come out of draft?).

### Schema documents

This repo contains the following top level  schemas:

* `schema/geojson.json` - validates a GeoJSON document
* `schema/whosonfirst.json` - validates a Who's On First GeoJSON document (but see _TODOs_ below)

This repo also contains the following referenced schemas:

* `schema/geoson-bbox.json` - defines a GeoSON `bbox` object
* `schema/geojson-geometry.json` - defines a GeoJSON `geometry` object
* `schema/wof-hierarchy.json` - defines a Who's On First `wof:hierarchy` object

## Checking Who's On First Documents

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
$ ajv -d /var/whosonfirst-data/data/101/750/367/101750367.geojson -s schema/whosonfirst.json -r "schema/geojson-*.json" -r "schema/wof-*.json" --all-errors
/var/whosonfirst-data/data/101/750/367/101750367.geojson valid
```

A sample failed validation might look something like this ...

```
$ ajv -d /var/whosonfirst-data/data/101/750/551/101750551.geojson -s schema/whosonfirst.json -r "schema/geojson-*.json" -r "schema/wof-*.json" --all-errors
/Users/gary/Data/Downloads/whosonfirst-data/data/101/750/551/101750551.geojson invalid
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

## TODOs

* Provide a helper command line tool to recurse through a hierarchy of Who's On First documents
* Provide schema definitions for the alternate (`*-alt-*.geojson`) Who's On First documents

## See also

* http://json-schema.org/
* http://json-schema.org/implementations.html
* https://spacetelescope.github.io/understanding-json-schema/
* https://github.com/fge/sample-json-schemas/blob/master/geojson/geojson.json
* https://www.tbray.org/ongoing/When/201x/2016/04/30/JSON-Schema-funnies
