const db = new Dexie('miBaseDatos');
db.version(1).stores({
    autores: '++id, nombre, apellido'
});

const { createApp } = Vue;

createApp({
    data() {
        return {
            autor: { id: null, nombre: '', apellido: '' },
            autores: [],
            busqueda: ''
        };
    },
    async mounted() {
        await this.actualizarListaAutores();
    },
    computed: {
        // 🔍 Filtra autores según la búsqueda
        autoresFiltrados() {
            return this.autores.filter(autor =>
                autor.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
                autor.apellido.toLowerCase().includes(this.busqueda.toLowerCase())
            );
        }
    },
    methods: {
        async guardarAutor() {
            try {
                if (!this.autor.nombre || !this.autor.apellido) {
                    alert("Completa todos los campos");
                    return;
                }

                if (this.autor.id) {
                    await db.autores.put({ id: this.autor.id, nombre: this.autor.nombre, apellido: this.autor.apellido });
                    alert("Autor actualizado correctamente");
                } else {
                    await db.autores.add({ nombre: this.autor.nombre, apellido: this.autor.apellido });
                    alert("Autor guardado correctamente");
                }

                await this.actualizarListaAutores();
                this.cancelarEdicion();

            } catch (error) {
                console.error("Error al guardar:", error);
            }
        },
        async actualizarListaAutores() {
            this.autores = await db.autores.toArray();
        },
        editarAutor(autor) {
            this.autor = { ...autor };
        },
        cancelarEdicion() {
            this.autor = { id: null, nombre: '', apellido: '' };
        },
        async eliminarAutor(id) {
            if (confirm("¿Estás seguro de eliminar este autor?")) {
                await db.autores.delete(id);
                await this.actualizarListaAutores();
            }
        }
    }
}).mount('#app');