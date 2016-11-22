'use strict';
const isValidJavaScriptIdentifier = require('../util/isValidJavaScriptIdentifier');
const Node = require('./Node');

class Property extends Node {
    constructor(def) {
        super('Property');
        this.key = def.key;
        this.value = def.value;
    }

    generateCode(codegen) {
        var key = this.key;
        var value = this.value;

        if (key.type === 'Literal') {
            var propName = key.value;
            if (isValidJavaScriptIdentifier(propName)) {
                key = codegen.builder.identifier(propName);
            }
        }

        this.key = codegen.generateCode(key);
        this.value = codegen.generateCode(value);

        return this;
    }

    writeCode(writer) {
        var key = this.key;
        var value = this.value;
        writer.write(key);
        writer.write(': ');
        writer.write(value);
    }

    toJSON() {
        return {
            type: 'Property',
            key: this.key,
            value: this.value
        };
    }

    walk(walker) {
        this.key = walker.walk(this.key);
        this.value = walker.walk(this.value);
    }

    toString() {
        var key = this.key;
        var value = this.value;

        if (key.type === 'Literal') {
            var propName = key.value;
            if (isValidJavaScriptIdentifier(propName)) {
                key = propName;
            }
        }

        return key + ': ' + value;
    }
}

module.exports = Property;