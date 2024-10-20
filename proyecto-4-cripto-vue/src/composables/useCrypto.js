import { ref, onMounted,computed} from 'vue';

export default function useCrypto() {

    const criptoMonedas = ref([]);

    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', texto: 'Peso Mexicano' },
        { codigo: 'EUR', texto: 'Euro' },
        { codigo: 'GBP', texto: 'Libra Esterlina' },
    ]);
    onMounted(() => {
        //Llamado a la API de cryptomonedas
        //Consulta hecho con fetch
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';
        fetch(url).then(respuesta => respuesta.json()) //Obtenemos la respuesta y la convertimos a JSON
            .then(resultado => { criptoMonedas.value = resultado.Data; }) //Imprimimos el resultado

    });
    const cargando = ref(false);
    const cotizacion = ref({});
    //Hecho con fetch y Asym Await
    const obtenerCotizacion = async (cotizar) => {
        //Consultar la API para obtener la cotización
        try {
            cargando.value = true;
            cotizacion.value = {};
            const { moneda, criptoMoneda } = cotizar;
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            cotizacion.value = resultado.DISPLAY[criptoMoneda][moneda];
        } catch (error) {
            console.log(error);
        } finally { cargando.value = false; }
    }
    const mostrarResultado = computed(() => {
        return Object.values(cotizacion.value).length > 0
      });
    return { monedas, criptoMonedas, obtenerCotizacion, cotizacion, cargando,mostrarResultado };
}
