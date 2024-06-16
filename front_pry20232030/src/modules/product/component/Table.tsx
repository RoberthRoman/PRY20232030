/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material";
import { esES } from "@mui/x-data-grid/locales";
import { Typography } from "@mui/material";

const QuickSearchToolbar = () => {
    return (
        <div style={{ position: 'absolute', top: '-30px', right: '-220px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', width:'200px', height: '20px'}}>
            <div style={{ border: '1px solid #ccc', backgroundColor: '#fff', borderRadius: '8px', padding: '4px'}}>
                {/* Aquí puedes establecer el mensaje por defecto del buscador */}
                <GridToolbarQuickFilter  />
            </div>
        </div>
    );
}

const theme = createTheme(
    {
      palette: {
        primary: { main: '#1976d2' },
      },
    },
    esES,
  );    

const Table = ({ rows, columns }:any) => {
    return (
        <ThemeProvider theme={theme}>  
            <div style={{ height: '400px', position: 'relative' }}>
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    slots={{
                        toolbar: QuickSearchToolbar
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    sx={{
                        '& .MuiDataGrid-columnHeader': {
                            backgroundColor: '#42D885',
                            fontWeight: 'bold',
                            fontSize: '1.25rem',
                            color: '#FFFFFF',
                            paddingLeft: '2rem'
                        },
                        '& .MuiDataGrid-cell': {
                            color: '#3F3D56',
                            paddingLeft: '2rem',
                            paddingTop: '4px', // Reduce el relleno superior
                            paddingBottom: '4px', // Reduce el relleno inferior
                            fontSize: '1.25rem', // Reduce el tamaño de la fuente
                        },
                        border: 'none',
                        '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus': {
                            outline: 'none',
                        },
                        '& .Mui-selected': {
                            backgroundColor: 'rgba(0, 0, 0, .15) !important',
                            transition: 'background-color 500ms',
                        },
                        '& .MuiDataGrid-virtualScroller': {
                            overflowX: 'hidden'
                        },
                        '& .MuiDataGrid-root':{
                        }
                    }}
                    disableRowSelectionOnClick
                    components={{
                        NoRowsOverlay: CustomNoRowsOverlay
                    }}
                />
            </div>
        </ThemeProvider>
    )
}

// Componente personalizado para mostrar el mensaje cuando no hay elementos
const CustomNoRowsOverlay = () => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6">No se encontraron elementos</Typography>
        </div>
    );
}

export default Table;

