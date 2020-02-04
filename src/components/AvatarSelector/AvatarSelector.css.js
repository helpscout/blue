import styled from '../styled'
import { getColor } from '../../styles/utilities/color'

export const AvatarWrapperUI = styled.div`
  padding: 2px;
`
export const IconAssignUI = styled.div``

export const IconCaretUI = styled.div`
  margin-left: -2px;
`

export const AvatarSelectorWrapperUI = styled('div')`
  height: ${({ size }) => (size === 'lg' ? '42' : '32')}px;
  display: inline-flex;
  position: relative;
  border-radius: 100px;
  background-color: transparent;
  z-index: 2;
  padding: 0;
  align-items: center;
  color: ${getColor('charcoal.200')};
  cursor: pointer;
  pointer-events: all;

  &:focus,
  &.is-open {
    outline: none;
    box-shadow: 0 0 0px 2px ${getColor('blue.500')};
  }

  &:hover,
  &:focus,
  &.is-open {
    background-color: white;
    color: ${getColor('charcoal.500')};
  }

  ${IconAssignUI} {
    padding: 9px 0 9px 7px;
  }

  ${IconCaretUI} {
    padding-right: 7px;
  }

  ${AvatarWrapperUI} + ${IconCaretUI}{
    margin-left: 0;
  }

  .c-Avatar.is-smmd {
    width: 38px;
    height: 38px;
  }
`