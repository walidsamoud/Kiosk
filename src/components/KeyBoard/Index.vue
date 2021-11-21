<template>
  <div id="KeyBoard">
    <div class="chars">
      <div class="title">
        <span v-if="optingFor=='lname'"> Entrer votre nom </span>
        <span v-else> Entrer votre prénom </span>
      </div>
      <div class="char" @click="type('A')">A</div>
      <div class="char" @click="type('B')">B</div>
      <div class="char" @click="type('C')">C</div>
      <div class="char" @click="type('D')">D</div>
      <div class="char" @click="type('E')">E</div>
      <div class="char" @click="type('F')">F</div>
      <div class="char" @click="type('G')">G</div>
      <div class="char" @click="type('H')">H</div>
      <div class="char" @click="type('I')">I</div>
      <div class="char" @click="type('J')">J</div>
      <div class="char" @click="type('K')">K</div>
      <div class="char" @click="type('L')">L</div>
      <div class="char" @click="type('M')">M</div>
      <div class="char" @click="type('N')">N</div>
      <div class="char" @click="type('O')">O</div>
      <div class="char" @click="type('P')">P</div>
      <div class="char" @click="type('Q')">Q</div>
      <div class="char" @click="type('R')">R</div>
      <div class="char" @click="type('S')">S</div>
      <div class="char" @click="type('T')">T</div>
      <div class="char" @click="type('U')">U</div>
      <div class="char" @click="type('V')">V</div>
      <div class="char" @click="type('W')">W</div>
      <div class="char" @click="type('X')">X</div>
      <div class="char" @click="type('Y')">Y</div>
      <div class="char" @click="type('Z')">Z</div>

      <br>
      <br>
      <div class="char" @click="type('<')">&#60;</div>
      <div class="char" @click="type('Space')" style="width: 200px;">Espace</div>
      <div class="char" @click="type('*')">X</div>

    </div>
  </div>
</template>

<script>
export default({
  data:()=>({

  }),
  props:{
    optingFor: String
  },
  methods:{
    type(char){
      this.$emit('KeyboardKeyUp', char)
    }
  }
})
</script>

<style lang="scss" scoped>
  .chars{
    text-align: center;
    position: absolute;
    top: 40%;
    transform: translate(0, -50%);
    padding: 40px;
    .title{
      color: var(--info);
      margin-bottom: 20px;
    }
    .char{
      width: 60px;
      height: 60px;
      background: rgba(255, 255, 255, 0.8);
      color: #333;
      text-align: center;
      padding-top: 15px;
      border-radius: 5px;
      margin-right: 5px;
      display: inline-block;
      transition: .2s;
    }
    .char:hover{
      background: rgba(255, 255, 255,1);
    }
  }
</style>