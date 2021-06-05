import React from 'react';
import {
  Button,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { lighten, makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import { Product } from 'graphqlAPI';
import { useShop } from 'contexts/Shop';
import { Amount } from 'components/Fields/Amount';
import { Prices } from 'components/Prices';
import { AvatarProduct } from 'components/Product';
import { createAPIImageRoute } from 'constantsApp';
import beer from 'assets/beer.png';

interface AddCartProps {
  product: Product;
}

export default function AddCart({ product: item }: AddCartProps) {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState<number>(1);
  const { addProduct, products } = useShop();

  const getMax = React.useCallback(() => {
    const itemShop = products.find(({ id }) => item.id === id);
    const max = (item.amount || 99) - (itemShop?.amount || 0);
    return max;
  }, [products, item]);

  React.useEffect(() => {
    const max = getMax();
    if (amount > max) setAmount(max);
  }, [amount, getMax, setAmount]);

  const handleChange = (newValue: string | number) => {
    const max = getMax();
    const value = Number(newValue);
    setAmount(value > max ? max : value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="secondary" onClick={handleClickOpen}>
        Comprar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <ListItem>
            <ListItemAvatar>
              <AvatarProduct
                alt={item.name}
                src={
                  (item.image && createAPIImageRoute(item.image)) ||
                  beer
                }
              />
            </ListItemAvatar>
            <ListItemText primary={item.name} />
          </ListItem>
        </DialogTitle>
        <DialogContent>
          <Amount handleChange={handleChange} value={amount} />
          <Grid container>
            <Prices
              {...{ amount, price: item.price }}
              showTotal={amount > 1}
              xs={12}
              sm={amount > 1 ? 6 : 12}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            endIcon={<AddShoppingCartIcon />}
            onClick={() => {
              if (amount) {
                addProduct({ id: item.id, amount });
                handleClose();
                setAmount(1);
              }
            }}
            color="secondary"
          >
            <Typography noWrap>Agregar al carrito</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
