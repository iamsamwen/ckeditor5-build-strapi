
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport';

/**
 * A plugin extending General HTML Support for example custom HTML elements.
 */
class ExtendHTMLSupport extends Plugin {
    static get requires() {
        return [ GeneralHtmlSupport ];
    }

    init() {
        // Extend schema with custom HTML elements.
        const dataFilter = this.editor.plugins.get( 'DataFilter' );
        const dataSchema = this.editor.plugins.get( 'DataSchema' );

        // Inline element
        dataSchema.registerInlineElement( {
            view: 'element-inline',
            model: 'myElementInline'
        } );

        // Custom elements need to be registered using direct API instead of config.
        dataFilter.allowElement( 'element-inline' );
        dataFilter.allowAttributes( { name: 'element-inline', attributes: { 'data-foo': false }, classes: [ 'foo' ] } );

        // Block element
        dataSchema.registerBlockElement( {
            view: 'element-block',
            model: 'myElementBlock',
            modelSchema: {
                inheritAllFrom: '$block'
            }
        } );

        dataFilter.allowElement( 'element-block' );

                // Inline object element
        dataSchema.registerInlineElement( {
            view: 'object-inline',
            model: 'myObjectInline',
            isObject: true,
            modelSchema: {
                inheritAllFrom: '$inlineObject'
            }
        } );

        dataFilter.allowElement( 'object-inline' );

        // Block object element
        dataSchema.registerBlockElement( {
            view: 'object-block',
            model: 'myObjectBlock',
            isObject: true,
            modelSchema: {
                inheritAllFrom: '$blockObject'
            }
        } );

        dataFilter.allowElement( 'object-block' );
    }
}

export default ExtendHTMLSupport;