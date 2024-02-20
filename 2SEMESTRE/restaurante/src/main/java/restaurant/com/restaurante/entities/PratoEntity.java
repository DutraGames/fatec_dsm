package restaurant.com.restaurante.entities;

import java.util.ArrayList;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = "prato")
public class PratoEntity {
    @Id
    @GeneratedValue
    private int id;
    private String nome;
    private double preco;
    @ManyToMany(mappedBy = "pratos")
    private java.util.List<PedidoEntity> pedidos = new ArrayList<>();
}
