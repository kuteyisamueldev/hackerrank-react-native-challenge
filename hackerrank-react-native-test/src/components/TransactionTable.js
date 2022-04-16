import React, {useRef, useState} from 'react';
import {View, TextInput, Text} from 'react-native';
import Styles from '../styles';
import Button from './base/Button';
import Table from './base/Table';
import TableRow from './base/TableRow';
import TableData from './base/TableData';
import TableHeader from './base/TableHeader';
import TableBody from './base/TableBody';

function TransactionTable({txns}) {
    const sort = () => {
        let sortableArray = transactions.map(item => {return item.amount}).sort(function (a,b) {return a - b });
        let sortedTransactions = sortableArray.map(amount => {
            return txns.find(txnItem => txnItem.amount === amount)
        })

       // console.log(sortedTransactions)

        updateTransactionList(sortedTransactions)

    };

    const [transactions, updateTransactionList] = useState(txns);
    const dateValue = useRef("")

    return (
        <View style={[Styles.layout_column, Styles.align_items_center, Styles.mt_50]}>
            <View style={[Styles.layout_row, Styles.align_items_center, Styles.justify_content_center]}>
                <Text style={[Styles.mr_10]}>Transaction Date</Text>
                <TextInput
                    style={[Styles.px_10, Styles.input_large]}
                    testID="app-input"
                    placeholder="YYYY-MM-DD"
                    onChangeText={(value) => {
                        dateValue.current = value
                    }}
                />
                <View>
                    <Button
                        style={[Styles.mx_8, Styles.button, Styles.button_small]}
                        onPress={() => {
                            let transactionList = txns.filter(item => item.date === dateValue.current);

                            if (dateValue.current === '') {
                                updateTransactionList(txns)
                            }

                            if (transactionList.length > 0) {
                                updateTransactionList(transactionList)
                            }


                        }}
                            testID="submit-button">
                        Filter
                    </Button>
                </View>
            </View>

            <View style={[Styles.card, Styles.mt_50, {minWidth: '65%'}]}>
                <Table>
                    <View>
                        <TableRow>
                            <TableHeader>Date</TableHeader>
                            <TableHeader flex={3.5}>Description</TableHeader>
                            <TableHeader>Type</TableHeader>
                            <TableHeader
                                testID="amount"
                                onPress={sort}
                                style={[Styles.table_thead_tr_th_sortable]}>Amount ($)
                            </TableHeader>
                            <TableHeader>Available Balance</TableHeader>
                        </TableRow>
                        <TableBody testID="records-body">
                            {
                                transactions.map((transactionItem, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableData>{ transactionItem.date }</TableData>
                                            <TableData flex={3.5}>{ transactionItem.description }</TableData>
                                            <TableData>{ transactionItem.type === 1 ? 'Debit' : 'Credit'}</TableData>
                                            <TableData>{ transactionItem.amount }</TableData>
                                            <TableData>{ transactionItem.balance }</TableData>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </View>
                </Table>
            </View>
        </View>
    );
}

export default TransactionTable;
