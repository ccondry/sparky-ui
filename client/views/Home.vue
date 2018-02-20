<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-3 is-hidden-mobile"></div>
      <div class="tile is-parent is-6">
        <article class="tile is-child box">
          <div class="messages">
            <ul>
              <li v-for="message of messages">
                <span :class="message.type">{{ message.text }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
      <div class="tile is-parent is-3 is-hidden-mobile"></div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'messages'
    ])
  }
}
</script>

<style lang="scss">
:root {
  --left-color: #E4FCEF;
  --right-color: #dbedfe;
  --system-color: #ffff00;
  --border-color: grey;
}

.messages {
  padding: 10px;
  height: 400px;
  background-color: white;
  background-color: rgb(237, 239, 244);
  border-width: 4px;
  border-color: #000000;
  border-style: solid;
  overflow-y: scroll;

  ul {
    padding: 0px;
    list-style-type: none;

    li {
      height: auto;
      margin-bottom: 10px;
      clear: both;
      padding-left: 10px;
      padding-right: 10px;

      span {
        display: inline-block;
        max-width: 200px;
        background-color: white;
        padding: 5px;
        border-radius: 4px;
        position: relative;
        border-width: 1px;
        border-style: solid;
        border-color: var(--border-color);
      }

      span.left {
        float: left;
      }

      span.right {
        float: right;
        background-color: var(--right-color);
      }

      span.systemmsg-chat {
        float: left;
        background-color: var(--system-color);
      }
      span.left-chat {
        float: left;
        background-color: var(--left-color);
      }

      span.left:after {
        content: "";
        display: inline-block;
        position: absolute;
        left: -8.5px;
        top: 7px;
        height: 0px;
        width: 0px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid white;
      }

      span.left:before {
        content: "";
        display: inline-block;
        position: absolute;
        left: -9px;
        top: 7px;
        height: 0px;
        width: 0px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid var(--border-color);
      }

      span.systemmsg-chat:after {
        content: "";
        display: inline-block;
        position: absolute;
        left: -8.5px;
        top: 7px;
        height: 0px;
        width: 0px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid var(--system-color);
      }

      span.systemmsg-chat:before {
        content: "";
        display: inline-block;
        position: absolute;
        left: -9px;
        top: 7px;
        height: 0px;
        width: 0px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid var(--border-color);
      }

      span.left-chat:after {
        content: "";
        display: inline-block;
        position: absolute;
        left: -8.5px;
        top: 7px;
        height: 0px;
        width: 0px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid var(--left-color);
      }

      span.left-chat:before {
        content: "";
        display: inline-block;
        position: absolute;
        left: -9px;
        top: 7px;
        height: 0px;
        width: 0px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid var(--border-color);
      }

      span.right:after {
        content: "";
        display: inline-block;
        position: absolute;
        right: -8px;
        top: 6px;
        height: 0px;
        width: 0px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 8px solid var(--right-color);
      }

      span.right:before {
        content: "";
        display: inline-block;
        position: absolute;
        right: -9px;
        top: 6px;
        height: 0px;
        width: 0px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 8px solid var(--border-color);
      }
    }
  }
}
</style>
