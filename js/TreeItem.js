import {ref , computed } from 'vue';
export default {
    name : 'TreeItem',
    props: {
        tree: Object,
    },
    setup(props){

        const isFolder = computed(()=> {
            return props.tree.childreens.length; 
        })

        const isOpen = computed(()=>{
            return props.tree.childreens.length && props.tree.isOpen ;
        })

        const isClosed = 
        computed(()=>{
            return props.tree.childreens.length && !props.tree.isOpen ;
        })

  
        const open = () =>{
            props.tree.isOpen = true ;
        }

        const close = () =>{
            props.tree.isOpen = false ;
        }

        const add = () => {
            const id = props.tree.childreens.length ;
            props.tree.childreens.push({id : id , data : "new stuff" , isOpen : false , childreens : []});
        }

        return {
            isFolder,
            isOpen,
            isClosed,
            open,
            close,
            add,
        }

    },

    template:
    `<li>
        <div :class="isFolder?'folder':'file'">
                {{ tree.data }}
            <span class="open" @click="close" v-if="isOpen">[-]</span>
            <span class="close" @click="open" v-else-if="isClosed">[+]</span>
            <span v-else></span>
            <ul :class="isOpen?'tree-open':'tree-close'">
                <tree-item  v-for="child in tree.childreens" :key="tree.id" :tree="child" ></tree-item>
                <li @click="add">+</li>
            </ul>
        </div>
    </li>`

}