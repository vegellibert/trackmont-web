/*
 * Copyright 2016 Vicente Venegas  (vicente@republik.ec)
 * Copyright 2016 Andrey Kunitsyn (andrey@trackmont.com)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

Ext.define('Trackmont.DeviceImages', {
    singleton: true,

    getImageSvg: function (color, zoom, angle, category) {
        var i, info, svg, width, height, rotateTransform, scaleTransform, fill;

        info = Ext.getStore('DeviceImages').findRecord('key', category || 'default', 0, false, false, true);
        svg = Ext.clone(info.get('svg'));
        if (!svg) {
            svg = this.cloneDocument(info.get('svg'));
        }

        width = parseFloat(svg.documentElement.getAttribute('width'));
        height = parseFloat(svg.documentElement.getAttribute('height'));

        fill = info.get('fillId');
        if (!Ext.isArray(fill)) {
            fill = [fill];
        }
        for (i = 0; i < fill.length; i++) {
            svg.getElementById(fill[i]).style.fill = color;
        }

        rotateTransform = 'rotate(' + angle + ' ' + width / 2 + ' ' + height / 2 + ')';
        svg.getElementById(info.get('rotateId')).setAttribute('transform', rotateTransform);

        if (zoom) {
            width *= Trackmont.Style.mapScaleSelected;
            height *= Trackmont.Style.mapScaleSelected;
            scaleTransform = 'scale(' + Trackmont.Style.mapScaleSelected + ') ';
        } else {
            width *= Trackmont.Style.mapScaleNormal;
            height *= Trackmont.Style.mapScaleNormal;
            scaleTransform = 'scale(' + Trackmont.Style.mapScaleNormal + ') ';
        }

        if (info.get('scaleId') !== info.get('rotateId')) {
            svg.getElementById(info.get('scaleId')).setAttribute('transform', scaleTransform);
        } else {
            svg.getElementById(info.get('scaleId')).setAttribute('transform', scaleTransform + ' ' + rotateTransform);
        }

        svg.documentElement.setAttribute('width', width);
        svg.documentElement.setAttribute('height', height);
        svg.documentElement.setAttribute('viewBox', '0 0 ' + width + ' ' + height);

        return svg;
    },

    formatSrc: function (svg) {
        return 'data:image/svg+xml;charset=utf-8,' +
                encodeURIComponent(new XMLSerializer().serializeToString(svg.documentElement));
    },

    cloneDocument: function (svgDocument) {
        var newDocument, newNode;
        newDocument = svgDocument.implementation.createDocument(svgDocument.namespaceURI, null, null);
        newNode = newDocument.importNode(svgDocument.documentElement, true);
        newDocument.appendChild(newNode);
        return newDocument;
    },

    getImageIcon: function (color, zoom, angle, category) {
        var image, svg, width, height;

        svg = this.getImageSvg(color, zoom, angle, category);
        width = parseFloat(svg.documentElement.getAttribute('width'));
        height = parseFloat(svg.documentElement.getAttribute('height'));

        image = new ol.style.Icon({
            imgSize: [width, height],
            src: this.formatSrc(svg)
        });
        image.fill = color;
        image.zoom = zoom;
        image.angle = angle;
        image.category = category;

        return image;
    }
});
