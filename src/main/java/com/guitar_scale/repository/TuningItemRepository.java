package com.guitar_scale.repository;

import com.guitar_scale.domain.TuningItem;
import com.guitar_scale.domain.id.TuningItemId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TuningItemRepository extends CrudRepository<TuningItem, TuningItemId> {

    List<TuningItem> getTuningItemByTuningNameOrderByStringNo(String tuningName);

    List<TuningItem> getTuningItemByTuningNameOrderByStringNoDesc(String tuningName);

    @Query(nativeQuery = true, value = "select * from tuning_item order by string_no")
    List<TuningItem> getAllOrdered();

}
