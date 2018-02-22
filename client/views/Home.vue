<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-4 is-hidden-mobile"></div>
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <div id="messages" class="messages">
            <ul>
              <li v-if="messages.length === 0">
                <span class="system">Connecting...</span>
              </li>
              <li v-for="message of messages">
                <span v-if="message.type !== 'command'" :class="message.type">{{ message.text }}</span>
              </li>
              <li id="last-message"></li>
            </ul>
          </div>
          <div class="input-box">
            <form>
              <textarea class="input"
              v-model="input"
              style="min-height: 3em; width:100%;"
              placeholder="Enter message"
              @keypress.enter.exact.prevent="submit"
              focus></textarea>
            </form>
          </div>
        </article>
      </div>
      <div class="tile is-parent is-4 is-hidden-mobile"></div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  mounted () {
    console.log('mounted')
    this.scrollToLastMessage()
  },
  data () {
    return {
      input: '',
      cancelScroll: null,
      interval: null
    }
  },
  computed: {
    ...mapGetters([
      'messages', 'sessionId'
    ])
  },
  methods: {
    ...mapActions(['addMessage', 'getMessages']),
    submit (e) {
      console.log(e)
      if (e.ctrlKey) {
        // TODO if they hit ctrl-enter, let them enter a newline and don't add to messages
      }
      // don't do anything if no text was entered
      if (!this.input.trim().length) {
        return
      }
      // add message to state
      this.addMessage({
        text: this.input,
        type: 'customer'
      })
      // clear input
      this.input = ''
    },
    async scrollToLastMessage () {
      console.log('scrolling')
      // scroll to the bottom if a new message was added
      this.$scrollTo('#last-message', 10, {container: '#messages'})
    }
  },
  watch: {
    messages (val, oldVal) {
      // scroll the last messgage into view, if there are new messages
      // if (val.length !== oldVal.length)
      this.scrollToLastMessage()
      // check message for command
      let message = val[val.length - 1]
      if (message.type === 'command') {
        // this.$emit('command', message.text)
        let command = message.text
        switch (command) {
          // case 'start-rem-video': {
          //   // start REM video call
          //   this.startRemCall()
          //   break
          // }
          case 'mortgage-calculator': {
            // open calculator
            window.open('https://cxdemo.net/demos/frank-bot/calculator.html', 'calculator', 'location=1,status=1,scrollbars=1,width=400,height=800')
            break
          }
        }
      }
    },
    sessionId (val, oldVal) {
      console.log('sessionId changed:', val)
      if (val && !oldVal) {
        // start getMessages loop
        this.interval = setInterval(this.getMessages, 2000)
      }
    }
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

.input-box {
  //   background-color: white;
  //   height: 40px;
  //   padding: 0px;
  // border-width: 4px;
  border-color: #000000;
  border-style: solid;
}
::-webkit-scrollbar {
  width: 0px;  /* remove scrollbar space */
  background: transparent;  /* optional: just make scrollbar invisible */
}
.messages {
  height: calc(100vh - 150px);
  // padding: 10px;
  // height: 400px;
  // background-color: white;
  background-color: rgb(237, 239, 244);
  // border-width: 4px;
  border-color: #000000;
  border-style: solid;
  overflow-y: scroll;
  overflow: scroll;

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
        margin-bottom: 4px;
        border-radius: 4px;
        position: relative;
        border-width: 1px;
        border-style: solid;
        border-color: var(--border-color);
      }

      span.bot {
        float: left;
      }

      span.customer {
        float: right;
        background-color: var(--right-color);
      }

      span.system {
        float: left;
        background-color: var(--system-color);
      }

      span.bot-chat {
        float: left;
        background-color: var(--left-color);
      }

      span.bot:after {
        content: "";
        display: inline-block;
        position: absolute;
        left: -8px;
        top: 7px;
        height: 0px;
        width: 0px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid white;
        // border-left: 8px solid var(--border-color);
        z-index: 101;
      }

      span.bot:before {
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
        z-index: 100;
      }

      span.system:after {
        content: "";
        display: inline-block;
        position: absolute;
        left: -8px;
        top: 7px;
        height: 0px;
        width: 0px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid var(--system-color);
      }

      span.system:before {
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

      span.bot-chat:after {
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

      span.bot-chat:before {
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

      span.customer:after {
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

      span.customer:before {
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

      span.agent-chat {
        float: left;
        background-color: var(--left-color);
      }

      span.agent:after {
        content: "";
        display: inline-block;
        position: absolute;
        left: -8px;
        top: 7px;
        height: 0px;
        width: 0px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid white;
        // border-left: 8px solid var(--border-color);
        z-index: 101;
      }

      span.agent:before {
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
        z-index: 100;
      }
    }
  }
}
</style>
