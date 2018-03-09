# whosonfirst-json-schema

JSON Schema definitions for Who's On First documents

## Who's On First Document types

At the time of writing, the [`whosonfirst-data`](https://github.com/whosonfirst-data/whosonfirst-data) repo contains two types of GeoJSON documents :-

1. _master_ documents; these contain the canonical definition of a Who's On First place and are named `[WOFID].geojson`.
2. _alternate_ documents; these contain supporting definitions for a Who's On First place and are named `[WOFID]-alt-*.geojson` (currently `[WOFID]-alt-quattroshapes_pg.geojson` and `[WOFID]-alt-naturalearth.geojson` exist in the `whosonfirst-data` repo)

## JSON Schema Version

The schemas in this repo have been written to conform to [JSON Schema v0.6 draft](http://json-schema.org/specification-links.html#draft-6) (note to self: when _will_ JSON Schema ever reach version 1.0 and come out of draft?).

## Schema documents

This repo contains the following top level schemas:

* `schema/geojson.json` - validates a GeoJSON document
* `schema/whosonfirst.json` - validates a _master_ Who's On First GeoJSON document
* `schema/whosonfirst-alt.json` - validates an _alternate_ Who's On First GeoJSON document

This repo also contains the following referenced schemas:

* `schema/geoson-bbox.json` - defines a GeoSON `bbox` object
* `schema/geojson-geometry.json` - defines a GeoJSON `geometry` object
* `schema/wof-hierarchy.json` - defines a Who's On First `wof:hierarchy` object

## Validating Who's On First Documents

See [`VALIDATING.md`](VALIDATING.md).

## See also

* http://json-schema.org/
* http://json-schema.org/implementations.html
* https://spacetelescope.github.io/understanding-json-schema/
* https://github.com/fge/sample-json-schemas/blob/master/geojson/geojson.json
* https://www.tbray.org/ongoing/When/201x/2016/04/30/JSON-Schema-funnies
