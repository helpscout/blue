import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { TruncatedUI } from './EditableField.css'
import Truncate from '../Truncate'
import { TRUNCATED_CLASSNAMES } from './EditableField.utils'

const EditableFieldTruncated = ({ string, splitter, ...rest }) => {
  if (splitter) {
    const [first, second] = string.split(splitter)

    return (
      <TruncatedUI
        {...getValidProps(rest)}
        className={`${TRUNCATED_CLASSNAMES.component} ${TRUNCATED_CLASSNAMES.withSplitter}`}
      >
        <span className={`${TRUNCATED_CLASSNAMES.firstChunk}`}>{first}</span>
        <span className={`${TRUNCATED_CLASSNAMES.secondChunk}`}>
          {splitter}
          {second}
        </span>
      </TruncatedUI>
    )
  }

  return (
    <Truncate
      {...getValidProps(rest)}
      className={`${TRUNCATED_CLASSNAMES.component}`}
    >
      {string}
    </Truncate>
  )
}

EditableFieldTruncated.propTypes = {
  className: PropTypes.string,
  string: PropTypes.string,
  splitter: PropTypes.string,
}

EditableFieldTruncated.defaultProps = {
  'data-cy': 'EditableFieldTruncated',
}

export default EditableFieldTruncated
