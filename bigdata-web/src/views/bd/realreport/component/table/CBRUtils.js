class CBRUtils {
    static getYesterdayColumns (col) {
        return "yesterday" + col.substring(0, 1).toUpperCase() + col.substring(1)
    }
}

export default CBRUtils