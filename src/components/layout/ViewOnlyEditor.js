import React from 'react';
import Editor from 'draft-js-plugins-editor';
import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-hashtag-plugin/lib/plugin.css';

const ViewOnlyEditor = (props) => {
   return (
      <React.Fragment>
         <Editor
            readOnly
            editorState={props.editorState}
            onChange={() => {}}
            plugins={props.plugins}
            {...props}
         />
      </React.Fragment>
   );
};

export default ViewOnlyEditor;
