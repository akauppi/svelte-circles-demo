/*
* Convert a browser event (touch or click) coordinates to a particular SVG element's inner coordinates.
*
* Based on:
*   - svg.rx.js -> https://github.com/akauppi/svg.rx.js
*/

/*
* Factory of event -> SVG coordinate conversion functions.
*
* svgEl:    <svg> or <g> element: the target element for the coordinates
*
*   An 'SVGPoint' node is created under this element, unless such is already there. This is needed for transforms.
*
* The returned function can be used for transforming events to the local SVG coordinates.
*/
function evToSvgPointGen(svgEl) {      // (ev: { ... }) -> { x: num, y: num }

    console.log("evToSvgPointGen", svgEl);

    // tbd. assert it's an 'SVGDoc' or 'SVGGroup'



    const m = svgEl.screenCTM().inverse().native();

    // Transformation will need an 'SVGPoint' buffer. We create one per factory (may not be ideal but at least we
    // don't create one per transform or need to runtime-check whether there's one already).
    //
    const buf = svgEl.node.createSVGPoint();        // tbd. would 'new SVGPoint' work?

    const convF = function (ev /*, offset*/) {   // (MouseEvent or Touch) -> SVGPoint (which has '.x' and '.y')
        buf.x = ev.clientX;  // - (offset || 0)
        buf.y = ev.clientY;

        const tmp = buf.matrixTransform(m);     // SVGPoint has { x: num, y: num }
        return tmp;
    };
    return convF;
}

export { evToSvgPointGen };
