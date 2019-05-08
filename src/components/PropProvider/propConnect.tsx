import * as React from 'react'
import { PropProviderProps, ConfigGetter } from './PropProvider.types'
import getComponentName from '@helpscout/react-utils/dist/getComponentName'
import hoistNonReactStatics from '@helpscout/react-utils/dist/hoistNonReactStatics'
import Context from './Context'
import {
  getConfigProps,
  getGlobalApp,
  propProviderDataAttr,
  isStateless,
} from './PropProvider.utils'
import { classNames } from '../../utilities/classNames'
import { setPackageVersionToGlobal } from '../../utilities/info'
import {
  namespaceComponent,
  isComponentNamespaced,
  unwrapNamespace,
} from '../../utilities/component'
import { isDefined, isString } from '../../utilities/is'
import { noop } from '../../utilities/other'

export interface Props {
  className?: string
  wrappedRef: (inst: any) => void
  style: Object
}

const defaultOptions = {
  pure: true,
  mapConnectedPropsAsProps: (props: any, ownProps: any) => props,
}

/**
 * "Connects" a component with the PropProvider (context). Concept is
 * similar to Redux's connect higher-order function.
 *
 * @param   {string} name The component's config namespace.
 * @returns {React.Component} The connected React component.
 */
function propConnect(name?: ConfigGetter, options: Object = {}) {
  const { pure, mapConnectedPropsAsProps } = { ...defaultOptions, ...options }
  // @ts-ignore
  let namespace: string = isString(name) ? name : ''

  setPackageVersionToGlobal()

  return function wrapWithComponent(WrappedComponent: any) {
    if (!isDefined(name)) {
      namespace = getComponentName(WrappedComponent)
    }
    const displayName = `propConnected(${namespace})`
    const OuterBaseComponent = pure ? React.PureComponent : React.Component

    // Register component internally
    if (!isComponentNamespaced(WrappedComponent)) {
      namespaceComponent(namespace)(WrappedComponent)
    }

    class Connect extends OuterBaseComponent<Props> {
      static defaultProps = {
        style: {},
        wrappedRef: noop,
      }
      static displayName = displayName

      wrappedInstance: any = null

      constructor(props, context) {
        super(props, context)
        this.setWrappedInstance = this.setWrappedInstance.bind(this)
      }

      setWrappedInstance(ref) {
        this.wrappedInstance = ref
        this.props.wrappedRef(ref)
      }

      getNamespacedProps = (contextProps: PropProviderProps): Object => {
        return getConfigProps(contextProps, namespace)
      }

      getMergedClassNameProp = (contextProps: PropProviderProps): string => {
        const namespacedProps = this.getNamespacedProps(contextProps)

        // @ts-ignore
        return classNames(namespacedProps.className, this.props.className)
      }

      getMergedStyleProp = (contextProps: PropProviderProps): Object => {
        const namespacedProps = this.getNamespacedProps(contextProps)
        let style = this.props.style
        // @ts-ignore
        if (namespacedProps.style) {
          style = {
            // @ts-ignore
            ...namespacedProps.style,
            ...style,
          }
        }

        return style
      }

      getDataNamespace = () => {
        const dataNamespace = this.props['data-cy'] || namespace

        return unwrapNamespace(dataNamespace)
      }

      getMergedProps = (contextProps: PropProviderProps): Object => {
        const { wrappedRef, ...rest } = this.props
        const namespacedProps = this.getNamespacedProps(contextProps)
        const className = this.getMergedClassNameProp(contextProps)
        const style = this.getMergedStyleProp(contextProps)

        return {
          'data-cy-component': namespace,
          ...namespacedProps,
          ...rest,
          className,
          'data-cy': this.getDataNamespace(),
          style,
          [propProviderDataAttr]: getGlobalApp(contextProps),
          ref: !isStateless(WrappedComponent)
            ? this.setWrappedInstance
            : undefined,
        }
      }

      render() {
        const { wrappedRef, ...ownProps } = this.props

        return (
          <Context.Consumer>
            {contextProps => (
              <WrappedComponent
                {...mapConnectedPropsAsProps(
                  this.getMergedProps(contextProps),
                  ownProps
                )}
              />
            )}
          </Context.Consumer>
        )
      }
    }

    return hoistNonReactStatics(Connect, WrappedComponent)
  }
}

export default propConnect
