const copy = {
    bind(el, { value }) {
        el.$value = value;
        el.handler = () => {
            if (!el.$value) {
                console.log("没有复制的内容...")
                return
            }
            // 动态创建textArea标签
            const textArea = document.createElement('textarea');
            // 防止ios自动唤起键盘
            textArea.readOnly = 'readOnly'
            textArea.style.position = 'absolute'
            textArea.style.left = '-9999px'

            // copy赋值给textArea的value属性
            textArea.value = el.$value
                // 将textArea插入到body
            document.body.appendChild(textArea);

            // 选中并且复制
            textArea.select()
        }
    }
}

export default copy