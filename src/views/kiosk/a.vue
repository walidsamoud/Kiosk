<template>
    <div>
        AAAAAAAAAAAAAAAAAAAA
        <b>BBBBBBBBBBBBBB</b>
    </div>
</template>
<script>

export default ({
    mounted(){
        window.print()
        setTimeout(function(){ window.close(); }, 5000);
    }
})
</script>
