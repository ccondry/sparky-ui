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
              v-model="input"
              style="min-height: 3em; width:100%;"
              placeholder="Type a message..."
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
            window.open('http://static.cxdemo.net/documents/sparky/calculator.html', 'calculator', 'location=1,status=1,scrollbars=1,width=400,height=800')
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
  --left-color: #f1f0f0;
  --right-color: rgb(64, 128, 255);
  --system-color: #ffff00;
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
  height: calc(100vh - 150px);
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

      // span.bot:after {
      //   content: "";
      //   display: inline-block;
      //   position: absolute;
      //   left: -8px;
      //   top: 7px;
      //   height: 0px;
      //   width: 0px;
      //   border-top: 8px solid transparent;
      //   border-bottom: 8px solid transparent;
      //   border-right: 8px solid white;
      //   border-left: 8px solid var(--border-color);
      //   z-index: 101;
      // }

      // span.bot:before {
      //   content: "";
      //   display: inline-block;
      //   position: absolute;
      //   left: -9px;
      //   top: 7px;
      //   height: 0px;
      //   width: 0px;
      //   border-top: 8px solid transparent;
      //   border-bottom: 8px solid transparent;
      //   border-right: 8px solid var(--border-color);
      //   z-index: 100;
      // }

      // span.system:after {
      //   content: "";
      //   display: inline-block;
      //   position: absolute;
      //   left: -8px;
      //   top: 7px;
      //   height: 0px;
      //   width: 0px;
      //   border-top: 8px solid transparent;
      //   border-bottom: 8px solid transparent;
      //   border-right: 8px solid var(--system-color);
      // }

      // span.system:before {
      //   content: "";
      //   display: inline-block;
      //   position: absolute;
      //   left: -9px;
      //   top: 7px;
      //   height: 0px;
      //   width: 0px;
      //   border-top: 8px solid transparent;
      //   border-bottom: 8px solid transparent;
      //   border-right: 8px solid var(--border-color);
      // }

      // span.bot-chat:after {
      //   content: "";
      //   display: inline-block;
      //   position: absolute;
      //   left: -8.5px;
      //   top: 7px;
      //   height: 0px;
      //   width: 0px;
      //   border-top: 8px solid transparent;
      //   border-bottom: 8px solid transparent;
      //   border-right: 8px solid var(--left-color);
      // }

      // span.bot-chat:before {
      //   content: "";
      //   display: inline-block;
      //   position: absolute;
      //   left: -9px;
      //   top: 7px;
      //   height: 0px;
      //   width: 0px;
      //   border-top: 8px solid transparent;
      //   border-bottom: 8px solid transparent;
      //   border-right: 8px solid var(--border-color);
      // }

      // span.customer:after {
      //   content: "";
      //   display: inline-block;
      //   position: absolute;
      //   right: -8px;
      //   top: 6px;
      //   height: 0px;
      //   width: 0px;
      //   border-top: 8px solid transparent;
      //   border-bottom: 8px solid transparent;
      //   border-left: 8px solid var(--right-color);
      // }

      // span.customer:before {
      //   content: "";
      //   display: inline-block;
      //   position: absolute;
      //   right: -9px;
      //   top: 6px;
      //   height: 0px;
      //   width: 0px;
      //   border-top: 8px solid transparent;
      //   border-bottom: 8px solid transparent;
      //   border-left: 8px solid var(--border-color);
      // }

      span.agent-chat {
        float: left;
        background-color: var(--left-color);
      }

      // span.agent:after {
      //   content: "";
      //   display: inline-block;
      //   position: absolute;
      //   left: -8px;
      //   top: 7px;
      //   height: 0px;
      //   width: 0px;
      //   border-top: 8px solid transparent;
      //   border-bottom: 8px solid transparent;
      //   border-right: 8px solid white;
      //   // border-left: 8px solid var(--border-color);
      //   z-index: 101;
      // }

      // span.agent:before {
      //   content: "";
      //   display: inline-block;
      //   position: absolute;
      //   left: -9px;
      //   top: 7px;
      //   height: 0px;
      //   width: 0px;
      //   border-top: 8px solid transparent;
      //   border-bottom: 8px solid transparent;
      //   border-right: 8px solid var(--border-color);
      //   z-index: 100;
      // }
    }
  }
}
</style>
