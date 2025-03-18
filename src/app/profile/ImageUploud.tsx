export default function ImageUploud(event) {
    const file = event.target.files?.[0];
    if (file) {
        const data = new FormData()
        data.append("file", file)
        const res = fetch("http://localhost:3000/upload", {
            method: "POST",
            body: data
        })
    }
}
