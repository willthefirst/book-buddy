import React, { Component} from 'react'
import { Editor } from 'react-draft-wysiwyg'
// #todo: customize text editor: https://jpuri.github.io/react-draft-wysiwyg/#/docs
// also https://github.com/jpuri/react-draft-wysiwyg/blob/master/docs/src/components/Demo/index.js
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export class Notes extends Component {

  render() {
    const toolbarOptions = {
      options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'remove', 'history'],
      inline: {
        options: ['bold', 'italic', 'underline', 'strikethrough'],
      },
    }

    return (
      <Editor
        wrapperClassName="react-draft__wrapper"
        editorClassName="react-draft__editor"
        toolbarClassName="react-draft__toolbar"
        toolbar={toolbarOptions}
        />
    )
  }
}

Notes.propTypes = {

}

export default Notes
