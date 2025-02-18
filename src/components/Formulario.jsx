import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { RegistroService } from '../services/RegistroService'

const registroService = new RegistroService();

export default function Formulario(props) {
  const [isDisabledIglesia, setIsDisabledIglesia] = useState(true);
  const [menuItemTipoDoc, setMenuItemTipoDoc] = useState([]);
  const [evento, setEvento] = useState('');
  const [isSendForm, setIsSendForm] = useState(false);

  const handleChangeIglesia = (event) => {
    const isDisabledIglesia = event.target.value !== 'Otra';
    setIsDisabledIglesia(isDisabledIglesia)
  };

  const registrarMaker = async (event) => {
    event.preventDefault();
    setIsSendForm(true)

    const iglesiaRegistro = event.target.iglesia.value === "Otra"
      ? event.target.otraIglesia.value
      : event.target.iglesia.value

    const dataFormMaker = {
      id_tipo_doc: event.target.id_tipo_doc.value,
      nro_doc: event.target.nroDoc.value,
      nombre: event.target.nombre.value,
      apellido: event.target.apellidos.value,
      ciudad: event.target.ciudad.value,
      edad: event.target.edad.value,
      iglesia: iglesiaRegistro,
      celular: event.target.celular.value,
      email: event.target.email.value,
      id_evento: evento
    }

    const makerResponse =  await registroService.createMakerBack(dataFormMaker);
    if (makerResponse.status === 200) {
      const makerResponseData = await makerResponse.data;
      if (makerResponseData.status === "ok") {
        props.setIsCreated(true)
        setIsSendForm(false)
        props.setCodigoQr(makerResponseData.codigo_qr)
        props.setName(makerResponseData.nombres_apellidos)
      }
    }
  }

  useEffect(() => {
    const getTypeDocument = async () => {
      const { data: typeDocuments } =  await registroService.getAllTipoDocumento();
      const itemsTipoDoc = typeDocuments.map(({ id, descripcion }) => ({ id, descripcion }))
      setMenuItemTipoDoc(itemsTipoDoc)
    }

    const getEvent = async () => {
      const eventoResponse =  await registroService.getEvento();
      const eventoResponseData  = eventoResponse.data;
      setEvento(eventoResponseData.id)
    }

    Promise.all([
      getTypeDocument(),
      getEvent()
    ])
  }, []);

  return (
    <Box
      component="form"
      onSubmit={registrarMaker}
      pt={3}
      style={{ margin: '12px 30px 0px' }}
    >
      <div style={{ maxWidth: '900px', margin: '0px auto'}}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Typography
            style={{color: 'white'}}
            gutterBottom
            variant="h2"
            fontFamily="Mokoto,Roboto,Helvetica"
            fontSize={40}
          >
            REGISTRO
          </Typography>
          <Typography style={{ color: 'white', marginBottom: '12px' }}>
            Regístrate llenando el siguiente formularo y sigue las indicaciones para obtener tu credencial para Congreso Hacedores 2022.
          </Typography>
          <Typography style={{color: 'white'}}>
            Recuerda asistir temprano para asegurar tu lugar en cada conferencia.
          </Typography>
        </div>

        <Grid container rowSpacing={2} columnSpacing={{ lg: 4, md: 4, sm: 4, xl: 4 }}>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl fullWidth>
              <InputLabel>Tipo de documento</InputLabel>
              <Select
                required
                labelId="tipo-doc-label"
                id="tipo-doc-select"
                label="Tipo de documento"
                type="select"
                fullWidth
                variant="standard"
                autoComplete="off"
                name="id_tipo_doc"
                defaultValue=""
              >
                {menuItemTipoDoc.map(({ id, descripcion }) => (
                  <MenuItem key={id} value={id}>
                    {descripcion}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              required
              id="nroDoc"
              name="nroDoc"
              label="Nro. Documento"
              type="number"
              variant="standard"
              fullWidth
              autoComplete="off"
              inputProps={{ inputMode: 'numeric' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              required
              id="nombre"
              name="nombre"
              label="Nombres"
              type="text"
              variant="standard"
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              required
              id="apellidos"
              name="apellidos"
              label="Apellidos"
              type="text"
              variant="standard"
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              required
              id="celular"
              name="celular"
              label="Celular"
              type="number"
              variant="standard"
              fullWidth
              autoComplete="off"
              inputProps={{ inputMode: 'numeric' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              required
              id="edad"
              name="edad"
              label="Edad"
              type="number"
              variant="standard"
              fullWidth
              autoComplete="off"
              inputProps={{ inputMode: 'numeric' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl fullWidth>
              <InputLabel>Iglesia</InputLabel>
              <Select
                required
                labelId="iglesia-label"
                id="iglesia-select"
                label="Iglesia"
                onChange={handleChangeIglesia}
                fullWidth
                variant="standard"
                autoComplete="off"
                name="iglesia"
                defaultValue=""
                type="text"
              >
                <MenuItem key={1} value="Casa de Vida">Casa de Vida</MenuItem>
                <MenuItem key={2} value="Otra">Otra</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              required={!isDisabledIglesia}
              disabled={isDisabledIglesia}
              id="otraIglesia"
              name="otraIglesia"
              label="Nombre de su iglesia"
              type="text"
              variant="standard"
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              id="ciudad"
              name="ciudad"
              label="Ciudad"
              type="text"
              variant="standard"
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              id="email"
              name="email"
              label="Correo electrónico"
              type="email"
              variant="standard"
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{ marginBottom: '1rem' }}
            >
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Button disabled={isSendForm} type="submit" fullWidth variant="contained" color="register">
                  Registrar
                </Button>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Box>
  )
}