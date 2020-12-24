import { convertFromRaw, EditorState, CompositeDecorator } from 'draft-js';
import MultiDecorator from 'draft-js-plugins-editor/lib/Editor/MultiDecorator';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import { CircularProgress } from '@material-ui/core';
import omit from 'lodash/omit';

const MAX_LENGTH = 280;
const MIN_LENGTH = 1;

const linkifyPlugin = createLinkifyPlugin({
   target: '_blank',
   // eslint-disable-next-line jsx-a11y/anchor-has-content
   component: (params) => <a {...omit(params, ['blockKey'])} />,
});
const hashtagPlugin = createHashtagPlugin();

export const viewOnlyPlugins = [linkifyPlugin, hashtagPlugin];

const getPluginDecoratorArray = () => {
   let decorators = [];
   let plugin;
   // check each plugin that will be used in the editor for decorators
   // (retrieve listOfPlugins however makes sense in your code)
   for (plugin of viewOnlyPlugins) {
      if (plugin.decorators !== null && plugin.decorators !== undefined) {
         // if the plugin has any decorators, add them to a list of all decorators from all plugins
         decorators = decorators.concat(plugin.decorators);
      }
   }
   return decorators;
};

const grabAllPluginDecorators = () => {
   return new MultiDecorator([
      new CompositeDecorator(getPluginDecoratorArray()),
   ]);
};

export const convertToEditorState = (editorContent) => {
   let decorator = grabAllPluginDecorators();
   const content = convertFromRaw(JSON.parse(editorContent));
   const newEditorState = EditorState.createWithContent(content, decorator);
   return newEditorState;
};
