import { Node } from 'tiptap'

export default class SweetLinkPreview extends Node {
  get name () {
    return 'sweet_link_preview'
  }

  get schema () {
    return {
      // here you have to specify all values that can be stored in this node
      attrs: {
        href: {
          default: null
        },
        title: {
          default: null
        },
        description: {
          default: null
        },
        image: {
          default: null
        },
        domain: {
          default: null
        }
      },
      group: 'block',
      draggable: true,
      // parseDOM and toDOM is still required to make copy and paste work
      parseDOM: [
        {
          tag: 'sweet-link-preview',
          getAttrs: dom => ({
            href: dom.getAttribute('data-href'),
            title: dom.getAttribute('data-title'),
            description: dom.getAttribute('data-description'),
            image: dom.getAttribute('data-image'),
            domain: dom.getAttribute('data-domain'),
          })
        }
      ],
      toDOM: node => [
        'sweet-link-preview',
        {
          'data-href': node.attrs.href,
          'data-title': node.attrs.title,
          'data-description': node.attrs.description,
          'data-image': node.attrs.image,
          'data-domain': node.attrs.domain,
        }
      ]
    }
  }

  // return a vue component
  // this can be an object or an imported component
  get view () {
    return {
      // there are some props available
      // `node` is a Prosemirror Node Object
      // `updateAttrs` is a function to update attributes defined in `schema`
      // `view` is the ProseMirror view instance
      // `options` is an array of your extension options
      // `selected` is a boolean which is true when selected
      // `editor` is a reference to the TipTap editor instance
      // `getPos` is a function to retrieve the start position of the node
      // `decorations` is an array of decorations around the node
      props: ['node', 'updateAttrs', 'view'],
      computed: {
        href: {
          get () {
            return this.node.attrs.href
          },
          set (href) {
            this.updateAttrs({
              href
            })
          }
        },
        title: {
          get () {
            return this.node.attrs.title
          },
          set (title) {
            this.updateAttrs({
              title
            })
          }
        },
        description: {
          get () {
            return this.node.attrs.description
          },
          set (description) {
            this.updateAttrs({
              description
            })
          }
        },
        image: {
          get () {
            return this.node.attrs.image
          },
          set (image) {
            this.updateAttrs({
              image
            })
          }
        },
        domain: {
          get () {
            return this.node.attrs.domain
          },
          set (domain) {
            this.updateAttrs({
              domain
            })
          }
        }
      },
      template: `
        <a class="link-preview-container" target="_blank" rel="noopener noreferrer nofollow" :href="href">
          <img class="link-preview-image" :src="image">
          <div class="link-preview-text-container">
            <span class="link-preview-title">{{ title }}</span>
            <span class="link-preview-description">{{ description }}</span>
            <span class="link-preview-domain">{{ domain }}</span>
          </div>
        </a>
      `
    }
  }

  commands ({ type }) {
    return attrs => (state, dispatch) => {
      const { selection } = state
      const position = selection.$cursor
        ? selection.$cursor.pos
        : selection.$to.pos
      const node = type.create(attrs)
      const transaction = state.tr.insert(position, node)
      dispatch(transaction)
    }
  }
}