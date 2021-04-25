<template>
  <body>
    <div class="split left">
      <div class="centered">
        <img
         src="@/assets/reservini-bkg.png" alt="image" />
      </div>
    </div>
    <div class="split right d-flex flex-column">
      <form method="post">
        <h1 class="p-2 text-center">S'identifer</h1>
        <div class="container pt-4">
          <div class="p-2">
            <label for="teminalID"><b>ID du terminal</b></label>
            <input
              type="text"
              placeholder="Enter Terminal ID"
              name="teminalID"
              required
            />
          </div>
          <div class="p-2">
            <label for="secretCode"><b>Code Secret</b></label>
            <input
              type="password"
              placeholder="Enter secret Code"
              name="secretCode"
              required
            />
          </div>
          <div class="p-2 pt-4">
            <button type="submit" class="btn btn-outline-light">
              Se Connecter
            </button>
          </div>
        </div>
      </form>
    </div>
  </body>
</template>
<style>
body {
  font-family: Arial;
  color: white;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
button {
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
}
button:hover {
  opacity: 0.8;
}
.split {
  height: 100%;
  width: 50%;
  position: fixed;
}

.left {
  left: 0;
  background-color: rgba(255, 255, 255, 0);
}

.right {
  right: 0;
  background-color: rgb(26, 4, 076);
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 50px;
  transform: translate(-50%, -50%);
  text-align: left;
}
</style>
<script>
export default {
  name: "Login",
  data: () => ({
    msg: "Login",
    key: "",
    secret: "",
    requestFailed: false,
    errors: [],
  }),
  methods: {
    /* eslint-disable */
    /* eslint-disable */
  },
  computed: {},
  created() {},
  mounted() {},
  components: {},
};
</script>

