<script>
export default {
  name: 'Computed',

  render () {
    return this.$slots.default(this.$attrs)
  }
}
</script>
