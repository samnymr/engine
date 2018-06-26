import React, { Component } from 'react';
import { isBlank } from '../../utils/misc';
import { bindAll } from 'lodash';

// HOC
import asView from '../../hoc/as_view';

// Services
import { build as buildBlock } from '../../services/blocks_service';

// Components
import Input from '../../inputs/base.jsx';
import BlockList from './edit/block_list.jsx';
import NewBlockPicker from './edit/new_block_picker.jsx';

class Edit extends Component {

  constructor(props) {
    super(props);
    bindAll(this, ['addBlock', 'moveBlock']);
  }

  // Called when an editor adds a new block
  addBlock(blockType) {
    this.props.addSectionBlock(
      this.props.sectionType,
      this.props.sectionId,
      buildBlock(
        this.props.sectionDefinition,
        blockType || this.props.sectionDefinition.blocks[0].type
      )
    )
  }

  // Called when an editor changes the block order
  moveBlock({ oldIndex, newIndex }) {
    this.props.moveSectionBlock(
      this.props.sectionType,
      this.props.sectionId,
      oldIndex,
      newIndex
    )
  }

  render() {
    return (
      <div className="editor-edit-section">
        <div className="row header-row">
          <div className="col-md-12">
            <h1>
              {this.props.sectionDefinition.name}
              &nbsp;
              <small>
                <a onClick={this.props.leaveView}>Back</a>
              </small>
            </h1>
          </div>
        </div>

        <div className="editor-section-settings">
          {this.props.sectionDefinition.settings.map(setting =>
            <Input
              key={`section-input-${setting.id}`}
              setting={setting}
              data={this.props.sectionContent}
              onChange={this.props.handleChange}
            />
          )}
        </div>

        <hr/>

        {!isBlank(this.props.sectionDefinition.blocks) && (
          <div className="editor-section-blocks">
            <h3>Blocks</h3>

            <BlockList
              moveBlock={this.moveBlock}
              {...this.props}
            />

            <NewBlockPicker
              addBlock={this.addBlock}
              {...this.props}
            />

          </div>
        )}
      </div>
    )
  }
}

export default asView(Edit);