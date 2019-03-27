<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-4 is-hidden-mobile"></div>
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <div id="messages" class="messages">
            <ul>
              <li v-if="messages.length === 0">
                <div class="message-container">
                  <span class="system">Connecting...</span>
                </div>
              </li>
              <li v-for="message of messages">
                <div class="message-container" :class="message.type">
                  <span v-if="message.type !== 'command'" :class="message.type" v-html="message.text"></span>
                </div>
              </li>
              <li id="last-message"></li>
            </ul>
          </div>
          <div class="input-box">
            <form>
              <textarea class="input"
              ref="textinput"
              v-model="input"
              style="min-height: 1em; width:82%;"
              placeholder="Type a message..."
              @keypress.enter.exact.prevent="submit"></textarea>
              <button class="button is-success" @click.prevent="submit">Send</button>
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
    // focus the text input
    this.$refs.textinput.focus()
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
      'messages',
      'sessionId',
      'socket'
    ])
  },
  methods: {
    ...mapActions([
      'addMessage',
      'getMessages',
      'saveIntervalRef'
    ]),
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
            window.open('http://mm-static.cxdemo.net/calculator.html', 'calculator', 'location=1,status=1,scrollbars=1,width=400,height=800')
            break
          }
          case 'change-brand-url': {
            console.log('received change-brand-url command with data =', message.data)
            // change branding page background iframe url
            // send message to container, assuming this page is an iframe
            window.parent.postMessage({
              type: 'sparky.command',
              command: 'change-brand-url',
              data: message.data,
            }, 'https://mm-chat.cxdemo.net')
          }
        }
      }
    },
    sessionId (val, oldVal) {
      console.log('sessionId changed:', val)
      if (val && !oldVal) {
        // got a new session ID - send the initial websocket message to start
        console.log('new session ID:', val)
        // receiving websocket messages
        console.log('sending websocket message to register this session ID.')
        // Send an initial message
        this.socket.send(JSON.stringify({
          sessionId: val
        }))

        // To close the socket....
        // this.socket.close()
      }
    }
  }
}
</script>

<style lang="scss">
:root {
  --left-color: #f1f0f0;
  --right-color: rgb(64, 128, 255);
  --system-color: #f1f0f0;
  --border-color: grey;
}

.input-box {
  //   background-color: white;
  //   height: 40px;
  //   padding: 0px;
  // border-width: 4px;
  // border-color: #000000;
  border-style: none;
}
::-webkit-scrollbar {
  width: 0px;  /* remove scrollbar space */
  background: transparent;  /* optional: just make scrollbar invisible */
}

/* placholder text color */
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #dddfe2;
}
::-moz-placeholder { /* Firefox 19+ */
  color: #dddfe2;
}
:-ms-input-placeholder { /* IE 10+ */
  color: #dddfe2;
}
:-moz-placeholder { /* Firefox 18- */
  color: #dddfe2;
}
/* /placholder text color */

.messages {
  height: calc(100vh - var(--buffer));
  // padding: 10px;
  // height: 400px;
  // background-color: white;
  // background-color: rgb(237, 239, 244);
  // border-width: 4px;
  // border-color: #000000;
  // border-style: solid;
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

      div.message-container {
        display: inline-block;
        max-width: 80%;
        background-color: white;
        // padding: 5px;
        margin-bottom: 4px;
        border-radius: 12px;
        position: relative;
        word-wrap: break-word;
        // border-width: 1px;
        // border-style: solid;
        // border-color: var(--border-color);
      }

      span {
        border-radius: 12px;
        min-height: 22px;
        min-width: 14px;
        overflow: hidden;
        position: relative;
        white-space: pre-wrap;
        padding: 5px 8px 6px;
        font-family: system-ui, -apple-system, system-ui, ".SFNSText-Regular", sans-serif;

      }

      .bot {
        float: left;
        background-color: var(--left-color);
        color: #4b4f56;
      }

      .customer {
        float: right;
        color: white;
        background-color: var(--right-color);
      }

      .system {
        float: left;
        background-color: var(--system-color);
      }

      .bot-chat {
        float: left;
        background-color: var(--left-color);
      }

      .agent {
        float: left;
        background-color: var(--left-color);
      }
    }
  }
}
</style>
